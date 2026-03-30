'use client'

import { AlertTriangle, AlertCircle, Info } from 'lucide-react'

interface Alert {
  id: string
  severity: 'critical' | 'warning' | 'info'
  title: string
  empresa: string
}

const SEVERITY_CONFIG = {
  critical: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
  warning: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
  info: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
}

export default function AlertList({ alerts }: { alerts: Alert[] }) {
  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
      <h3 className="text-sm text-white/60 mb-4">Alertas Ativos</h3>
      <div className="space-y-2">
        {alerts.map(a => {
          const cfg = SEVERITY_CONFIG[a.severity]
          const Icon = cfg.icon
          return (
            <div key={a.id} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${cfg.bg} border ${cfg.border}`}>
              <Icon size={16} className={cfg.color} />
              <div className="flex-1">
                <span className="text-sm text-white/90">{a.title}</span>
                <span className="text-xs text-white/30 ml-2">{a.empresa}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
