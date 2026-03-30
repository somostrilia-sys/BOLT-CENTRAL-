'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { BoltEmotion } from '@/types/bolt'

interface BoltRobotProps {
  emotion?: BoltEmotion
  isListening?: boolean
  isSpeaking?: boolean
}

const EMOTION_COLORS: Record<BoltEmotion, { primary: string; gold: string }> = {
  neutral: { primary: '#22d3ee', gold: '#f59e0b' },
  positive: { primary: '#10b981', gold: '#34d399' },
  warning: { primary: '#f59e0b', gold: '#fbbf24' },
  critical: { primary: '#ef4444', gold: '#f87171' },
}

export default function BoltRobot({ emotion = 'neutral', isListening, isSpeaking }: BoltRobotProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
  const { primary, gold } = EMOTION_COLORS[emotion]

  const opacity = isSpeaking ? 1 : isListening ? 0.9 : 0.8

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / window.innerWidth * 4
      const dy = (e.clientY - cy) / window.innerHeight * 3
      setEyeOffset({ x: Math.max(-2, Math.min(2, dx)), y: Math.max(-1.5, Math.min(1.5, dy)) })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.div
      ref={containerRef}
      animate={{
        y: [0, -6, 0],
        opacity,
      }}
      transition={{
        y: { duration: 4, ease: 'easeInOut', repeat: Infinity },
        opacity: { duration: 0.5 },
      }}
      className="relative"
    >
      <svg width="280" height="320" viewBox="0 0 280 320" fill="none" xmlns="http://www.w3.org/2000/svg" suppressHydrationWarning>
        <defs>
          {/* Cyan glow filter */}
          <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor={primary} floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Gold glow filter */}
          <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor={gold} floodOpacity="0.7" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Eye glow */}
          <filter id="eyeGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feFlood floodColor={primary} floodOpacity="0.9" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="glow" />
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Gradient for body */}
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={primary} stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.05" />
          </linearGradient>
          {/* Lightning bolt gradient */}
          <linearGradient id="boltGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor={gold} />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* === LIGHTNING EFFECTS (background) === */}
        {/* Left lightning */}
        <motion.path
          d="M30 80 L45 100 L35 105 L55 140 L40 135 L50 170"
          stroke={gold}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          filter="url(#goldGlow)"
          animate={{ opacity: [0.2, 0.8, 0.1, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Right lightning */}
        <motion.path
          d="M250 80 L235 100 L245 105 L225 140 L240 135 L230 170"
          stroke={gold}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          filter="url(#goldGlow)"
          animate={{ opacity: [0.1, 0.7, 0.2, 0.9, 0.1] }}
          transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        {/* Top left lightning */}
        <motion.path
          d="M60 30 L70 55 L62 58 L75 80"
          stroke={gold}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          filter="url(#goldGlow)"
          animate={{ opacity: [0, 0.6, 0, 0.4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
        />
        {/* Top right lightning */}
        <motion.path
          d="M220 30 L210 55 L218 58 L205 80"
          stroke={gold}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          filter="url(#goldGlow)"
          animate={{ opacity: [0, 0.5, 0, 0.7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: 0.7 }}
        />

        {/* === HELMET / HEAD === */}
        {/* Helmet outer shell */}
        <path
          d="M100 55 Q100 35 140 30 Q180 35 180 55 L180 90 Q180 100 170 105 L110 105 Q100 100 100 90 Z"
          stroke={primary}
          strokeWidth="1.5"
          fill="url(#bodyGrad)"
          filter="url(#cyanGlow)"
        />
        {/* Helmet inner visor frame */}
        <path
          d="M108 58 Q108 48 140 44 Q172 48 172 58 L172 82 Q172 88 166 90 L114 90 Q108 88 108 82 Z"
          stroke={primary}
          strokeWidth="1"
          fill="rgba(0,0,0,0.6)"
        />
        {/* Helmet top crest */}
        <motion.path
          d="M130 32 L140 20 L150 32"
          stroke={gold}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          filter="url(#goldGlow)"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Antenna */}
        <motion.line
          x1="140" y1="20" x2="140" y2="8"
          stroke={primary}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <motion.circle
          cx="140" cy="6" r="3"
          fill={primary}
          filter="url(#cyanGlow)"
          animate={{
            opacity: emotion === 'critical' ? [1, 0.2, 1] : [0.5, 1, 0.5],
            r: [3, 4, 3],
          }}
          transition={{
            duration: emotion === 'critical' ? 0.4 : 2,
            repeat: Infinity,
          }}
        />

        {/* === EYES === */}
        <motion.g
          animate={
            emotion === 'positive'
              ? { scaleY: [1, 0.3, 1] }
              : emotion === 'warning'
              ? { opacity: [1, 0, 1, 0, 1] }
              : {}
          }
          transition={{ duration: 0.6 }}
        >
          {emotion === 'critical' ? (
            <>
              <motion.text x="128" y="78" fill={primary} fontSize="16" fontWeight="bold" textAnchor="middle" filter="url(#eyeGlow)"
                animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.3, repeat: Infinity }}>!</motion.text>
              <motion.text x="152" y="78" fill={primary} fontSize="16" fontWeight="bold" textAnchor="middle" filter="url(#eyeGlow)"
                animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.3, repeat: Infinity }}>!</motion.text>
            </>
          ) : (
            <>
              {/* Left eye */}
              <motion.ellipse
                cx={126 + eyeOffset.x} cy={72 + eyeOffset.y}
                rx={isListening ? 8 : 6} ry={isListening ? 5 : 3.5}
                fill={primary}
                filter="url(#eyeGlow)"
                animate={{ scale: isListening ? 1.2 : 1 }}
                transition={{ type: 'spring' }}
              />
              {/* Right eye */}
              <motion.ellipse
                cx={154 + eyeOffset.x} cy={72 + eyeOffset.y}
                rx={isListening ? 8 : 6} ry={isListening ? 5 : 3.5}
                fill={primary}
                filter="url(#eyeGlow)"
                animate={{ scale: isListening ? 1.2 : 1 }}
                transition={{ type: 'spring' }}
              />
            </>
          )}
        </motion.g>

        {/* Helmet side details */}
        <line x1="100" y1="65" x2="92" y2="68" stroke={primary} strokeWidth="1" opacity="0.5" />
        <line x1="100" y1="75" x2="92" y2="78" stroke={primary} strokeWidth="1" opacity="0.5" />
        <line x1="180" y1="65" x2="188" y2="68" stroke={primary} strokeWidth="1" opacity="0.5" />
        <line x1="180" y1="75" x2="188" y2="78" stroke={primary} strokeWidth="1" opacity="0.5" />

        {/* === NECK === */}
        <rect x="128" y="105" width="24" height="10" rx="2" stroke={primary} strokeWidth="1" fill="url(#bodyGrad)" />
        <line x1="135" y1="107" x2="135" y2="113" stroke={primary} strokeWidth="0.5" opacity="0.4" />
        <line x1="140" y1="107" x2="140" y2="113" stroke={primary} strokeWidth="0.5" opacity="0.4" />
        <line x1="145" y1="107" x2="145" y2="113" stroke={primary} strokeWidth="0.5" opacity="0.4" />

        {/* === TORSO / CHEST === */}
        {/* Main chest plate */}
        <path
          d="M85 118 Q85 112 95 110 L185 110 Q195 112 195 118 L195 200 Q195 210 185 215 L95 215 Q85 210 85 200 Z"
          stroke={primary}
          strokeWidth="1.5"
          fill="url(#bodyGrad)"
          filter="url(#cyanGlow)"
        />
        {/* Chest inner panel */}
        <path
          d="M100 120 L180 120 L175 200 Q175 205 170 207 L110 207 Q105 205 105 200 Z"
          stroke={primary}
          strokeWidth="0.8"
          fill="rgba(0,0,0,0.4)"
          opacity="0.6"
        />

        {/* === LIGHTNING BOLT EMBLEM (chest) === */}
        <motion.path
          d="M150 132 L138 158 L148 158 L132 188 L155 162 L145 162 L158 132 Z"
          fill="url(#boltGrad)"
          stroke={gold}
          strokeWidth="1"
          filter="url(#goldGlow)"
          animate={{
            opacity: isSpeaking ? [0.8, 1, 0.8] : [0.6, 0.9, 0.6],
            scale: isSpeaking ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: isSpeaking ? 0.5 : 2.5,
            repeat: Infinity,
          }}
        />

        {/* Circuit lines on chest */}
        <path d="M100 135 L120 135 L125 140" stroke={primary} strokeWidth="0.6" opacity="0.3" />
        <path d="M180 135 L160 135 L155 140" stroke={primary} strokeWidth="0.6" opacity="0.3" />
        <path d="M100 155 L115 155" stroke={primary} strokeWidth="0.6" opacity="0.3" />
        <path d="M180 155 L165 155" stroke={primary} strokeWidth="0.6" opacity="0.3" />
        <path d="M100 175 L118 175 L120 180" stroke={primary} strokeWidth="0.6" opacity="0.3" />
        <path d="M180 175 L162 175 L160 180" stroke={primary} strokeWidth="0.6" opacity="0.3" />

        {/* Chest circle details */}
        <motion.circle cx="105" cy="145" r="4" stroke={primary} strokeWidth="0.8" fill="none" opacity="0.4"
          animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.circle cx="175" cy="145" r="4" stroke={primary} strokeWidth="0.8" fill="none" opacity="0.4"
          animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />

        {/* === SHOULDER PADS === */}
        {/* Left shoulder */}
        <path
          d="M85 115 Q65 115 55 130 L55 145 Q55 150 60 152 L85 152 L85 115 Z"
          stroke={primary}
          strokeWidth="1.5"
          fill="url(#bodyGrad)"
          filter="url(#cyanGlow)"
        />
        <circle cx="70" cy="133" r="5" stroke={gold} strokeWidth="1" fill="none" opacity="0.5" />
        <motion.circle cx="70" cy="133" r="2" fill={gold} opacity="0.4"
          animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />

        {/* Right shoulder */}
        <path
          d="M195 115 Q215 115 225 130 L225 145 Q225 150 220 152 L195 152 L195 115 Z"
          stroke={primary}
          strokeWidth="1.5"
          fill="url(#bodyGrad)"
          filter="url(#cyanGlow)"
        />
        <circle cx="210" cy="133" r="5" stroke={gold} strokeWidth="1" fill="none" opacity="0.5" />
        <motion.circle cx="210" cy="133" r="2" fill={gold} opacity="0.4"
          animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />

        {/* === ARMS (crossed) === */}
        {/* Left arm - crosses to right */}
        <motion.g
          animate={emotion === 'critical' ? { rotate: [-1, 1, -1] } : {}}
          transition={{ duration: 0.3, repeat: emotion === 'critical' ? Infinity : 0 }}
          style={{ transformOrigin: '85px 155px' }}
        >
          {/* Upper arm */}
          <path
            d="M60 152 L58 170 Q55 175 52 178 L80 195 Q90 190 92 185 L85 155 Z"
            stroke={primary}
            strokeWidth="1"
            fill="url(#bodyGrad)"
          />
          {/* Forearm crossing to right */}
          <path
            d="M80 195 L130 210 Q140 212 145 215 L150 218 Q148 222 142 220 L85 205 Q75 200 72 195 Z"
            stroke={primary}
            strokeWidth="1"
            fill="url(#bodyGrad)"
          />
          {/* Forearm detail lines */}
          <line x1="85" y1="198" x2="130" y2="212" stroke={primary} strokeWidth="0.5" opacity="0.3" />
          <line x1="90" y1="202" x2="125" y2="214" stroke={primary} strokeWidth="0.5" opacity="0.3" />
        </motion.g>

        {/* Right arm - crosses to left */}
        <motion.g
          animate={emotion === 'critical' ? { rotate: [1, -1, 1] } : {}}
          transition={{ duration: 0.3, repeat: emotion === 'critical' ? Infinity : 0 }}
          style={{ transformOrigin: '195px 155px' }}
        >
          {/* Upper arm */}
          <path
            d="M220 152 L222 170 Q225 175 228 178 L200 195 Q190 190 188 185 L195 155 Z"
            stroke={primary}
            strokeWidth="1"
            fill="url(#bodyGrad)"
          />
          {/* Forearm crossing to left */}
          <path
            d="M200 195 L150 210 Q140 212 135 215 L130 218 Q132 222 138 220 L195 205 Q205 200 208 195 Z"
            stroke={primary}
            strokeWidth="1"
            fill="url(#bodyGrad)"
          />
          {/* Forearm detail lines */}
          <line x1="195" y1="198" x2="150" y2="212" stroke={primary} strokeWidth="0.5" opacity="0.3" />
          <line x1="190" y1="202" x2="155" y2="214" stroke={primary} strokeWidth="0.5" opacity="0.3" />
        </motion.g>

        {/* === LOWER BODY === */}
        <path
          d="M100 215 L95 250 Q95 255 100 258 L180 258 Q185 255 185 250 L180 215 Z"
          stroke={primary}
          strokeWidth="1"
          fill="url(#bodyGrad)"
        />
        {/* Belt / waist detail */}
        <rect x="95" y="215" width="90" height="6" rx="2" stroke={gold} strokeWidth="0.8" fill="none" opacity="0.4" />
        <motion.rect x="132" y="216" width="16" height="4" rx="1" fill={gold} opacity="0.3"
          animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2.5, repeat: Infinity }} />

        {/* === LEGS === */}
        {/* Left leg */}
        <path d="M108 258 L105 290 Q104 295 100 298 L118 298 Q115 295 114 290 L115 258 Z"
          stroke={primary} strokeWidth="1" fill="url(#bodyGrad)" />
        {/* Left foot */}
        <path d="M98 298 L120 298 L122 305 Q122 308 118 308 L96 308 Q93 308 93 305 Z"
          stroke={primary} strokeWidth="1" fill="url(#bodyGrad)" />

        {/* Right leg */}
        <path d="M165 258 L168 290 Q169 295 172 298 L155 298 Q158 295 159 290 L158 258 Z"
          stroke={primary} strokeWidth="1" fill="url(#bodyGrad)" />
        {/* Right foot */}
        <path d="M175 298 L153 298 L151 305 Q151 308 155 308 L177 308 Q180 308 180 305 Z"
          stroke={primary} strokeWidth="1" fill="url(#bodyGrad)" />

        {/* Leg detail lines */}
        <line x1="109" y1="270" x2="114" y2="270" stroke={primary} strokeWidth="0.5" opacity="0.3" />
        <line x1="109" y1="280" x2="114" y2="280" stroke={primary} strokeWidth="0.5" opacity="0.3" />
        <line x1="166" y1="270" x2="161" y2="270" stroke={primary} strokeWidth="0.5" opacity="0.3" />
        <line x1="166" y1="280" x2="161" y2="280" stroke={primary} strokeWidth="0.5" opacity="0.3" />

        {/* === ENERGY PARTICLES === */}
        {[
          { cx: 95, cy: 90, r: 1.5, dur: 2.5, del: 0.2 },
          { cx: 185, cy: 120, r: 1.2, dur: 3.1, del: 0.8 },
          { cx: 110, cy: 180, r: 1.8, dur: 2.8, del: 1.5 },
          { cx: 170, cy: 200, r: 1.3, dur: 3.5, del: 0.5 },
          { cx: 130, cy: 100, r: 1.6, dur: 2.2, del: 2.0 },
          { cx: 155, cy: 250, r: 1.1, dur: 3.8, del: 1.2 },
          { cx: 100, cy: 230, r: 1.4, dur: 2.6, del: 0.3 },
          { cx: 175, cy: 150, r: 1.7, dur: 3.2, del: 1.8 },
        ].map((p, i) => (
          <motion.circle
            key={`particle-${i}`}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill={i % 3 === 0 ? gold : primary}
            animate={{
              opacity: [0, 0.8, 0],
              y: [0, -25],
            }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              delay: p.del,
            }}
          />
        ))}
      </svg>

      {/* Glow behind robot — cyan + gold */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${primary}18 0%, ${gold}08 40%, transparent 70%)`,
        }}
      />

      {/* Floor reflection */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140px] h-[12px] rounded-full"
        style={{
          background: `radial-gradient(ellipse, ${primary}30 0%, ${gold}10 50%, transparent 80%)`,
        }}
      />
    </motion.div>
  )
}
