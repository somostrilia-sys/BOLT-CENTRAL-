'use client'

import { Mic, MicOff } from 'lucide-react'
import { motion } from 'framer-motion'

interface MicButtonProps {
  isListening: boolean
  onToggle: () => void
}

export default function MicButton({ isListening, onToggle }: MicButtonProps) {
  return (
    <div className="relative">
      {isListening && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-bolt-primary"
          animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <motion.button
        onClick={onToggle}
        whileTap={{ scale: 0.9 }}
        className={`relative w-16 h-16 rounded-full border-2 flex items-center justify-center transition-colors ${
          isListening
            ? 'border-bolt-primary bg-bolt-primary text-white'
            : 'border-bolt-primary/50 bg-bolt-primary/15 text-bolt-glow hover:bg-bolt-primary/25'
        }`}
      >
        {isListening ? <MicOff size={24} /> : <Mic size={24} />}
      </motion.button>
    </div>
  )
}
