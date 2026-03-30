'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { formatBRL } from '@/lib/utils/formatters'

interface PieChartCardProps {
  title: string
  data: Array<{ name: string; value: number; color: string }>
  valueFormatter?: (v: number) => string
}

export default function PieChartCard({ title, data, valueFormatter = formatBRL }: PieChartCardProps) {
  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
      <h3 className="text-sm text-white/60 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v: any) => [valueFormatter(Number(v))]}
            contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 8, fontSize: 12 }}
          />
          <Legend
            formatter={(value) => <span className="text-xs text-white/60">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
