import { create } from 'zustand'
import type { BoltMessage, BoltEmotion, BoltStatus } from '@/types/bolt'

interface BoltStore {
  status: BoltStatus
  isListening: boolean
  isSpeaking: boolean
  isProcessing: boolean
  messages: BoltMessage[]
  currentTranscript: string
  emotion: BoltEmotion
  toggleListening: () => void
  addMessage: (msg: BoltMessage) => void
  setProcessing: (v: boolean) => void
  setSpeaking: (v: boolean) => void
  setStatus: (s: BoltStatus) => void
  setEmotion: (e: BoltEmotion) => void
  setCurrentTranscript: (t: string) => void
}

export const useBoltStore = create<BoltStore>((set, get) => ({
  status: 'idle',
  isListening: false,
  isSpeaking: false,
  isProcessing: false,
  messages: [
    {
      id: 'initial',
      role: 'bolt',
      text: 'Bom dia, Alex. Ontem a Objetivo vendeu 47 placas — 12% acima da meta. Inadimplência Campinas subiu para 11,3%. Quer que eu detalhe?',
      timestamp: new Date(),
      emotion: 'neutral',
    },
  ],
  currentTranscript: '',
  emotion: 'neutral',

  toggleListening: () => {
    const { isListening } = get()
    set({
      isListening: !isListening,
      status: !isListening ? 'listening' : 'idle',
    })
  },

  addMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),

  setProcessing: (v) => set({ isProcessing: v, status: v ? 'processing' : 'idle' }),
  setSpeaking: (v) => set({ isSpeaking: v, status: v ? 'speaking' : 'idle' }),
  setStatus: (s) => set({ status: s }),
  setEmotion: (e) => set({ emotion: e }),
  setCurrentTranscript: (t) => set({ currentTranscript: t }),
}))
