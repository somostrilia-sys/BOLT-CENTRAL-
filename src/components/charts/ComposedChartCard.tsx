'use client'

import {
  ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { formatBRL } from '@/lib/utils/formatters'

interface ComposedChartCardProps {
  title: string
  data: Array<Record<string, any>>
  bars: Array<{ key: string; color: string; name: string }>
  lines?: Array<{ key: string; color: string; name: string }>
  valueFormatter?: (v: number) => string
}

export default function ComposedChartCard({ title, data, bars, lines = [], valueFormatter = formatBRL }: ComposedChartCardProps) {
  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
      <h3 className="text-sm text-white/60 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <XAxis dataKey="dia" tick={{ fill: '#a1a1aa', fontSize: 11 }} />
          <YAxis tick={{ fill: '#a1a1aa', fontSize: 11 }} tickFormatter={valueFormatter} />
          <Tooltip
            formatter={(v: any) => [valueFormatter(Number(v))]}
            contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 8, fontSize: 12 }}
          />
          <Legend formatter={(value) => <span className="text-xs text-white/60">{value}</span>} />
          {bars.map(b => (
            <Bar key={b.key} dataKey={b.key} fill={b.color} name={b.name} radius={[2, 2, 0, 0]} />
          ))}
          {lines.map(l => (
            <Line key={l.key} type="monotone" dataKey={l.key} stroke={l.color} name={l.name} strokeWidth={2} dot={false} />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
