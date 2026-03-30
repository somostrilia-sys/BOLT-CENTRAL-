'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string
  change?: number
  changeLabel?: string
  progress?: number
  progressColor?: string
  subtitle?: string
  icon?: React.ReactNode
  delay?: number
}

export default function KPICard({
  title, value, change, changeLabel, progress, progressColor, subtitle, icon, delay = 0,
}: KPICardProps) {
  const isPositive = change !== undefined && change > 0
  const isNegative = change !== undefined && change < 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.05, duration: 0.3 }}
      className="bg-[#18181b] border border-[#27272a] rounded-xl p-4 hover:-translate-y-0.5 transition-transform"
    >
      <div className="flex items-start justify-between">
        <span className="text-[#a1a1aa] text-xs uppercase tracking-wider">{title}</span>
        {icon && <span className="text-white/20">{icon}</span>}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">{value}</span>
        {change !== undefined && (
          <span className={`flex items-center gap-0.5 text-xs ${
            isPositive ? 'text-emerald-400' : isNegative ? 'text-red-400' : 'text-white/40'
          }`}>
            {isPositive ? <TrendingUp size={12} /> : isNegative ? <TrendingDown size={12} /> : <Minus size={12} />}
            {changeLabel || `${Math.abs(change).toFixed(1)}%`}
          </span>
        )}
      </div>

      {subtitle && <p className="text-[#a1a1aa] text-xs mt-1">{subtitle}</p>}

      {progress !== undefined && (
        <div className="mt-3">
          <div className="flex justify-between text-[10px] text-white/30 mb-1">
            <span>Meta</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 1, delay: delay * 0.05 + 0.3 }}
              className="h-full rounded-full"
              style={{ backgroundColor: progressColor || '#6366f1' }}
            />
          </div>
        </div>
      )}
    </motion.div>
  )
}
