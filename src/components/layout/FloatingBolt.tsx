'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, X, Send } from 'lucide-react'
import { useBoltStore } from '@/lib/stores/boltStore'

export default function FloatingBolt() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const { messages, addMessage, setProcessing, setEmotion } = useBoltStore()
  const alertCount = 2

  const send = async () => {
    if (!input.trim()) return
    const text = input
    setInput('')
    addMessage({ id: Date.now().toString(), role: 'user', text, timestamp: new Date() })
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
      })
    } catch {
      setProcessing(false)
    }
  }

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-bolt-primary flex items-center justify-center shadow-lg shadow-bolt-primary/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={alertCount > 0 ? { boxShadow: ['0 0 0 0 rgba(34,211,238,0.4)', '0 0 0 12px rgba(34,211,238,0)'] } : {}}
        transition={alertCount > 0 ? { duration: 2, repeat: Infinity } : {}}
      >
        <Zap size={20} className="text-white" />
        {alertCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
            {alertCount}
          </span>
        )}
      </motion.button>

      {/* Sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed top-0 right-0 z-50 w-[400px] h-screen bg-black border-l border-[#27272a] flex flex-col"
          >
            <div className="flex items-center justify-between px-4 h-14 border-b border-[#27272a]">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-bolt-glow" />
                <span className="text-bolt-glow font-bold text-sm tracking-wider">BOLT</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white/60">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                      msg.role === 'bolt'
                        ? 'bg-cyan-500/12 border border-cyan-500/20 text-white/90'
                        : 'bg-white/6 border border-white/10 text-white/80'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-[#27272a]">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Pergunte ao BOLT..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-bolt-primary/40"
                />
                <button
                  onClick={send}
                  className="w-9 h-9 rounded-lg bg-bolt-primary flex items-center justify-center hover:bg-bolt-primary/80"
                >
                  <Send size={14} className="text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
