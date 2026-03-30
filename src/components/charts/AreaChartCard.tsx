'use client'

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { formatBRL } from '@/lib/utils/formatters'

interface AreaChartCardProps {
  title: string
  data: Array<Record<string, any>>
  dataKey: string
  metaKey?: string
  color?: string
  valueFormatter?: (v: number) => string
}

export default function AreaChartCard({ title, data, dataKey, metaKey, color = '#6366f1', valueFormatter = formatBRL }: AreaChartCardProps) {
  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
      <h3 className="text-sm text-white/60 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="mes" tick={{ fill: '#a1a1aa', fontSize: 11 }} />
          <YAxis tick={{ fill: '#a1a1aa', fontSize: 11 }} tickFormatter={valueFormatter} />
          <Tooltip
            formatter={(v: any, name: any) => [valueFormatter(Number(v)), name === dataKey ? 'Valor' : 'Meta']}
            contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 8, fontSize: 12 }}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            fill={`url(#grad-${dataKey})`}
            strokeWidth={2}
          />
          {metaKey && (
            <Area
              type="monotone"
              dataKey={metaKey}
              stroke="#a1a1aa"
              strokeDasharray="5 5"
              fill="none"
              strokeWidth={1.5}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
