'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import BoltRobot from '@/components/bolt/BoltRobot'
import AudioWaves from '@/components/bolt/AudioWaves'
import MicButton from '@/components/bolt/MicButton'
import BoltChat from '@/components/bolt/BoltChat'
import ParticleBackground from '@/components/bolt/ParticleBackground'
import { useBoltStore } from '@/lib/stores/boltStore'

const STATUS_TEXT: Record<string, string> = {
  idle: 'Pronto para ouvir',
  listening: 'Ouvindo...',
  processing: 'Processando...',
  speaking: '⚡ Bolt está falando...',
}

const SUGGESTIONS = [
  'Como está a Objetivo?',
  'Faturamento do mês',
  'Alertas críticos',
  'Ranking franquias',
]

export default function BoltPage() {
  const router = useRouter()
  const [time, setTime] = useState('')
  const [inputText, setInputText] = useState('')

  const {
    status,
    isListening,
    isSpeaking,
    messages,
    emotion,
    toggleListening,
    addMessage,
    setProcessing,
    setSpeaking,
    setEmotion,
  } = useBoltStore()

  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return
    setInputText('')

    const userMsg = {
      id: Date.now().toString(),
      role: 'user' as const,
      text,
      timestamp: new Date(),
    }
    addMessage(userMsg)
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

      const botMsg = {
        id: (Date.now() + 1).toString(),
        role: 'bolt' as const,
        text: data.text,
        timestamp: new Date(),
        emotion: data.emotion,
        action: data.action,
      }
      addMessage(botMsg)

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

      if (data.action?.type === 'navigate' && data.action.path) {
        setTimeout(() => router.push(data.action.path), 1500)
      }
    } catch {
      setProcessing(false)
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'bolt',
        text: 'Desculpe, tive um problema ao processar. Tente novamente.',
        timestamp: new Date(),
      })
    }
  }, [addMessage, setProcessing, setSpeaking, setEmotion, router])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputText)
    }
  }

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden flex flex-col">
      <ParticleBackground />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-white/30 uppercase text-[11px] tracking-[2px] font-medium">
            WALK HOLDING — Sistema Central
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-white/20 text-xs font-mono">{time}</span>
          <Link
            href="/dashboard/overview"
            className="text-white/30 text-xs border border-white/10 px-3 py-1.5 rounded hover:border-bolt-primary/40 hover:text-bolt-glow transition-colors"
          >
            Painéis →
          </Link>
        </div>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-4 px-4">
        <BoltRobot emotion={emotion} isListening={isListening} isSpeaking={isSpeaking} />

        <div className="text-center mt-2">
          <h1 className="text-[42px] font-bold tracking-[8px]">
            <span className="text-bolt-gold">⚡</span>{' '}
            <span className="bg-gradient-to-r from-bolt-glow via-bolt-primary to-bolt-gold bg-clip-text text-transparent">BOLT</span>
          </h1>
          <p className="text-white/30 text-[12px] tracking-[4px] uppercase mt-1">
            Central de Inteligência
          </p>
        </div>

        <AudioWaves status={status} />

        <motion.p
          key={status}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/40 text-sm"
        >
          {STATUS_TEXT[status]}
        </motion.p>

        <BoltChat messages={messages} />
      </div>

      {/* Bottom */}
      <div className="relative z-10 flex flex-col items-center gap-4 pb-8">
        <MicButton isListening={isListening} onToggle={toggleListening} />

        <div className="flex items-center gap-2 w-full max-w-md px-4">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua pergunta..."
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-bolt-primary/40"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 px-4">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="text-white/40 text-[12px] bg-white/[0.04] border border-white/10 rounded-[20px] px-3 py-1.5 hover:bg-white/[0.08] hover:text-white/60 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-amber-500/[0.04] blur-[80px] pointer-events-none" />
    </div>
  )
}
