'use client'

import { motion } from 'framer-motion'
import type { BoltStatus } from '@/types/bolt'

interface AudioWavesProps {
  status: BoltStatus
}

export default function AudioWaves({ status }: AudioWavesProps) {
  const bars = 32

  return (
    <div className="flex items-center justify-center gap-[3px] h-[44px]">
      {Array.from({ length: bars }).map((_, i) => {
        const idle = status === 'idle' || status === 'processing'
        const listening = status === 'listening'
        const speaking = status === 'speaking'

        let height = 4
        let opacity = 0.4
        let duration = 0.8

        if (listening) {
          height = Math.random() * 36 + 4
          opacity = 0.6 + Math.random() * 0.4
          duration = 0.15 + Math.random() * 0.2
        } else if (speaking) {
          const wave = Math.sin((i / bars) * Math.PI * 2 + Date.now() / 300) * 0.5 + 0.5
          height = 4 + wave * 28
          opacity = 0.5 + wave * 0.5
          duration = 0.3
        }

        return (
          <motion.div
            key={i}
            className="w-[3px] rounded-full bg-bolt-primary"
            animate={{
              height: idle ? 4 : height,
              opacity: idle ? 0.4 : opacity,
            }}
            transition={{
              duration,
              repeat: idle ? 0 : Infinity,
              repeatType: 'reverse',
              delay: listening ? Math.random() * 0.3 : (i / bars) * 0.1,
            }}
          />
        )
      })}
    </div>
  )
}
