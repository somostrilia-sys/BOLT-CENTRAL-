'use client'

import { ClipboardCheck, Wrench, Clock, CalendarDays, DollarSign, TrendingUp, Package } from 'lucide-react'
import KPICard from '@/components/dashboard/KPICard'
import PieChartCard from '@/components/charts/PieChartCard'
import ComposedChartCard from '@/components/charts/ComposedChartCard'
import AreaChartCard from '@/components/charts/AreaChartCard'
import { formatBRL, formatNumber } from '@/lib/utils/formatters'

// --- Mock Data ---

const MESES = ['Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez','Jan','Fev','Mar']

const vistoriasReparos12m = MESES.map((mes, i) => ({
  dia: mes,
  vistorias: [110, 115, 120, 125, 128, 132, 135, 138, 140, 142, 143, 145][i],
  reparos: [8, 9, 7, 10, 11, 9, 12, 10, 11, 13, 11, 12][i],
}))

const tipoServicoPie = [
  { name: 'Vistoria', value: 45, color: '#6366f1' },
  { name: 'Funilaria', value: 25, color: '#8b5cf6' },
  { name: 'Mecanica', value: 20, color: '#a78bfa' },
  { name: 'Eletrica', value: 10, color: '#c4b5fd' },
]

const tempoMedio12m = MESES.map((mes, i) => ({
  mes,
  tempo: [3.2, 3.0, 2.9, 2.8, 2.7, 2.8, 2.6, 2.7, 2.5, 2.6, 2.5, 2.5][i],
}))

const servicosRows = [
  { placa: 'ABC-1D23', tipo: 'Vistoria', entrada: '14/03/2026', previsao: '14/03/2026', status: 'Concluido', valor: 350 },
  { placa: 'DEF-4E56', tipo: 'Funilaria', entrada: '10/03/2026', previsao: '18/03/2026', status: 'Em andamento', valor: 2800 },
  { placa: 'GHI-7F89', tipo: 'Mecanica', entrada: '08/03/2026', previsao: '20/03/2026', status: 'Em andamento', valor: 1950 },
  { placa: 'JKL-0G12', tipo: 'Eletrica', entrada: '12/03/2026', previsao: '15/03/2026', status: 'Atrasado', valor: 780 },
  { placa: 'MNO-3H45', tipo: 'Vistoria', entrada: '15/03/2026', previsao: '15/03/2026', status: 'Aguardando', valor: 350 },
]

const STATUS_COLORS: Record<string, string> = {
  'Concluido': 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
  'Em andamento': 'bg-blue-400/10 text-blue-400 border-blue-400/20',
  'Atrasado': 'bg-red-400/10 text-red-400 border-red-400/20',
  'Aguardando': 'bg-amber-400/10 text-amber-400 border-amber-400/20',
}

// --- Page ---

export default function OficinaPage() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        <KPICard title="Vistorias/mes" value="145" change={4.3} icon={<ClipboardCheck size={16} />} delay={0} />
        <KPICard title="Reparos Andamento" value="12" icon={<Wrench size={16} />} delay={1} />
        <KPICard title="Tempo Vistoria" value="2,5h" change={-7.4} icon={<Clock size={16} />} delay={2} />
        <KPICard title="Tempo Reparo" value="4,8 dias" change={-3.2} icon={<CalendarDays size={16} />} delay={3} />
        <KPICard title="Custo Medio" value={formatBRL(1200)} icon={<DollarSign size={16} />} delay={4} />
        <KPICard title="Receita" value={formatBRL(78000)} change={6.8} icon={<TrendingUp size={16} />} delay={5} />
        <KPICard title="Pecas Estoque" value={formatBRL(45000)} icon={<Package size={16} />} delay={6} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ComposedChartCard
          title="Vistorias vs Reparos (12 meses)"
          data={vistoriasReparos12m}
          bars={[{ key: 'vistorias', color: '#6366f1', name: 'Vistorias' }]}
          lines={[{ key: 'reparos', color: '#ef4444', name: 'Reparos' }]}
          valueFormatter={formatNumber}
        />
        <PieChartCard
          title="Tipo de Servico"
          data={tipoServicoPie}
          valueFormatter={(v: number) => `${v}%`}
        />
        <AreaChartCard
          title="Tempo Medio Vistoria - Evolucao (horas)"
          data={tempoMedio12m}
          dataKey="tempo"
          color="#f59e0b"
          valueFormatter={(v: number) => `${v.toFixed(1)}h`}
        />
      </div>

      {/* Table: Servicos */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
        <h3 className="text-sm text-white/60 mb-4">Servicos em Andamento</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 border-b border-[#27272a]">
                <th className="text-left py-2 px-3">Placa</th>
                <th className="text-left py-2 px-3">Tipo</th>
                <th className="text-left py-2 px-3">Entrada</th>
                <th className="text-left py-2 px-3">Previsao</th>
                <th className="text-left py-2 px-3">Status</th>
                <th className="text-right py-2 px-3">Valor</th>
              </tr>
            </thead>
            <tbody>
              {servicosRows.map((s, i) => (
                <tr key={i} className="border-b border-[#27272a]/50 text-white/80">
                  <td className="py-2.5 px-3 font-mono text-xs">{s.placa}</td>
                  <td className="py-2.5 px-3">{s.tipo}</td>
                  <td className="py-2.5 px-3 text-white/50">{s.entrada}</td>
                  <td className="py-2.5 px-3 text-white/50">{s.previsao}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs border ${STATUS_COLORS[s.status]}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="text-right py-2.5 px-3">{formatBRL(s.valor)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
