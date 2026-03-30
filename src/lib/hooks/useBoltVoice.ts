'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useBoltStore } from '@/lib/stores/boltStore'

export function useBoltVoice() {
  const recognitionRef = useRef<any>(null)
  const {
    isListening,
    toggleListening,
    setCurrentTranscript,
    addMessage,
    setProcessing,
    setSpeaking,
    setEmotion,
    setStatus,
  } = useBoltStore()

  const processMessage = useCallback(async (text: string) => {
    if (!text.trim()) return

    addMessage({
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date(),
    })

    setProcessing(true)

    try {
      const res = await fetch('/api/bolt/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      setProcessing(false)

      if (data.emotion) setEmotion(data.emotion)

      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'bolt',
        text: data.text,
        timestamp: new Date(),
        emotion: data.emotion,
        action: data.action,
      })

      // TTS
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(data.text)
        utterance.lang = 'pt-BR'
        utterance.rate = 1.0
        utterance.pitch = 1.0
        utterance.onstart = () => setSpeaking(true)
        utterance.onend = () => {
          setSpeaking(false)
          setEmotion('neutral')
        }
        speechSynthesis.speak(utterance)
      }

      return data
    } catch {
      setProcessing(false)
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'bolt',
        text: 'Desculpe, tive um problema. Tente novamente.',
        timestamp: new Date(),
      })
    }
  }, [addMessage, setProcessing, setSpeaking, setEmotion])

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.lang = 'pt-BR'
    recognition.continuous = true
    recognition.interimResults = true

    let silenceTimer: NodeJS.Timeout
    let finalTranscript = ''

    recognition.onresult = (event: any) => {
      let interim = ''
      finalTranscript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        } else {
          interim += transcript
        }
      }
      setCurrentTranscript(interim || finalTranscript)

      clearTimeout(silenceTimer)
      if (finalTranscript) {
        silenceTimer = setTimeout(() => {
          processMessage(finalTranscript)
          setCurrentTranscript('')
          finalTranscript = ''
        }, 1500)
      }
    }

    recognition.onerror = () => {
      setStatus('idle')
    }

    recognitionRef.current = recognition
  }, [processMessage, setCurrentTranscript, setStatus])

  useEffect(() => {
    const recognition = recognitionRef.current
    if (!recognition) return

    if (isListening) {
      try {
        recognition.start()
      } catch {}
    } else {
      recognition.stop()
    }
  }, [isListening])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault()
        if (!isListening) toggleListening()
      }
      if (e.code === 'Escape') {
        if (isListening) toggleListening()
        if ('speechSynthesis' in window) speechSynthesis.cancel()
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !(e.target instanceof HTMLInputElement)) {
        if (isListening) toggleListening()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [isListening, toggleListening])

  return { processMessage }
}
