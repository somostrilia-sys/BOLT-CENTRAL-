'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { formatBRL } from '@/lib/utils/formatters'

interface BarChartCardProps {
  title: string
  data: Array<{ name: string; value: number; color?: string }>
  horizontal?: boolean
  valueFormatter?: (v: number) => string
}

export default function BarChartCard({ title, data, horizontal = false, valueFormatter = formatBRL }: BarChartCardProps) {
  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
      <h3 className="text-sm text-white/60 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        {horizontal ? (
          <BarChart data={data} layout="vertical" margin={{ left: 80 }}>
            <XAxis type="number" tick={{ fill: '#a1a1aa', fontSize: 11 }} tickFormatter={valueFormatter} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#a1a1aa', fontSize: 11 }} width={80} />
            <Tooltip
              formatter={(v: any) => [valueFormatter(Number(v)), 'Valor']}
              contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 8, fontSize: 12 }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((d, i) => (
                <Cell key={i} fill={d.color || '#6366f1'} />
              ))}
            </Bar>
          </BarChart>
        ) : (
          <BarChart data={data}>
            <XAxis dataKey="name" tick={{ fill: '#a1a1aa', fontSize: 11 }} />
            <YAxis tick={{ fill: '#a1a1aa', fontSize: 11 }} tickFormatter={valueFormatter} />
            <Tooltip
              formatter={(v: any) => [valueFormatter(Number(v)), 'Valor']}
              contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 8, fontSize: 12 }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((d, i) => (
                <Cell key={i} fill={d.color || '#6366f1'} />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}
