'use client'

import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { BoltMessage } from '@/types/bolt'

interface BoltChatProps {
  messages: BoltMessage[]
}

export default function BoltChat({ messages }: BoltChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div
      ref={scrollRef}
      className="w-full max-w-[520px] max-h-[200px] overflow-y-auto scrollbar-thin px-2 space-y-3"
    >
      <AnimatePresence>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === 'bolt'
                  ? 'bg-cyan-500/12 border border-cyan-500/20 text-white/90'
                  : 'bg-white/6 border border-white/10 text-white/80'
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
