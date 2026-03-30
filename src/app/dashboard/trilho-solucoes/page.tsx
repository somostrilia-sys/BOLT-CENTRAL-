'use client'

import { useState } from 'react'
import { Truck, Phone, Clock, Wrench, CheckCircle, DollarSign, UserPlus, Settings, TrendingUp } from 'lucide-react'
import KPICard from '@/components/dashboard/KPICard'
import BarChartCard from '@/components/charts/BarChartCard'
import PieChartCard from '@/components/charts/PieChartCard'
import AreaChartCard from '@/components/charts/AreaChartCard'
import { formatBRL, formatNumber } from '@/lib/utils/formatters'

const TABS = ['Operacional', 'Comercial']

/* ── Mock: Chamados por hora (24h) ── */
const chamadosHora = Array.from({ length: 24 }, (_, i) => ({
  name: `${String(i).padStart(2, '0')}h`,
  value: Math.round(Math.random() * 8 + (i >= 6 && i <= 22 ? 4 : 1)),
}))

/* ── Mock: Tipo de chamado (pie) ── */
const tipoChamado = [
  { name: 'Roubo', value: 15, color: '#ef4444' },
  { name: 'Pane', value: 35, color: '#f59e0b' },
  { name: 'Acidente', value: 25, color: '#6366f1' },
  { name: 'Outros', value: 25, color: '#a1a1aa' },
]

/* ── Mock: TMA 30 dias (line/area) ── */
const tma30d = Array.from({ length: 30 }, (_, i) => ({
  mes: `D${i + 1}`,
  valor: Math.round(10 + Math.random() * 6),
}))

/* ── Mock: Pipeline funil (bar) ── */
const pipelineFunil = [
  { name: 'Prospecção', value: 120, color: '#6366f1' },
  { name: 'Qualificação', value: 78, color: '#818cf8' },
  { name: 'Proposta', value: 45, color: '#a78bfa' },
  { name: 'Negociação', value: 28, color: '#c4b5fd' },
  { name: 'Fechamento', value: 12, color: '#10b981' },
]

/* ── Mock: Faturamento 12m (area) ── */
const faturamento12m = [
  { mes: 'Abr', valor: 380000 },
  { mes: 'Mai', valor: 395000 },
  { mes: 'Jun', valor: 410000 },
  { mes: 'Jul', valor: 400000 },
  { mes: 'Ago', valor: 420000 },
  { mes: 'Set', valor: 435000 },
  { mes: 'Out', valor: 440000 },
  { mes: 'Nov', valor: 455000 },
  { mes: 'Dez', valor: 470000 },
  { mes: 'Jan', valor: 460000 },
  { mes: 'Fev', valor: 475000 },
  { mes: 'Mar', valor: 480000 },
]

export default function TrilhoSolucoesPage() {
  const [tab, setTab] = useState('Operacional')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Trilho Solu\u00e7\u00f5es</h1>
        <p className="text-white/40 text-sm">Monitoramento e assist\u00eancia 24h</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/[0.04] rounded-lg p-0.5 w-fit">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
              tab === t ? 'bg-[#6366f1] text-white' : 'text-white/50 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ═══ OPERACIONAL ═══ */}
      {tab === 'Operacional' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <KPICard title="Ve\u00edculos Monitorados" value={formatNumber(8450)} change={3.2} icon={<Truck size={16} />} delay={0} />
            <KPICard title="Chamados 24h" value="34" change={-5.6} icon={<Phone size={16} />} delay={1} />
            <KPICard title="TMA" value="12 min" subtitle="Tempo M\u00e9dio Atendimento" icon={<Clock size={16} />} delay={2} />
            <KPICard title="Tempo Reboque" value="45 min" subtitle="M\u00e9dia de chegada" icon={<Wrench size={16} />} delay={3} />
            <KPICard title="Resolu\u00e7\u00e3o 1\u00ba Contato" value="78%" progress={78} progressColor="#10b981" icon={<CheckCircle size={16} />} delay={4} />
            <KPICard title="Custo/Acionamento" value={formatBRL(185)} change={-2.1} icon={<DollarSign size={16} />} delay={5} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <BarChartCard
              title="Chamados por Hora"
              data={chamadosHora}
              valueFormatter={(v) => String(v)}
            />
            <PieChartCard
              title="Tipo de Chamado"
              data={tipoChamado}
              valueFormatter={(v) => `${v}%`}
            />
            <AreaChartCard
              title="TMA \u2014 \u00daltimos 30 Dias (min)"
              data={tma30d}
              dataKey="valor"
              color="#f59e0b"
              valueFormatter={(v) => `${v} min`}
            />
          </div>
        </>
      )}

      {/* ═══ COMERCIAL ═══ */}
      {tab === 'Comercial' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPICard title="Novas Associa\u00e7\u00f5es" value="89" change={12.5} icon={<UserPlus size={16} />} delay={0} />
            <KPICard title="Em Implanta\u00e7\u00e3o" value="23" icon={<Settings size={16} />} delay={1} />
            <KPICard title="Receita Recorrente/Assoc." value={formatBRL(156)} change={4.1} icon={<TrendingUp size={16} />} delay={2} />
            <KPICard title="Faturamento" value={formatBRL(480000)} change={8.3} progress={85} progressColor="#6366f1" icon={<DollarSign size={16} />} delay={3} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <BarChartCard
              title="Pipeline \u2014 Funil Comercial"
              data={pipelineFunil}
              valueFormatter={(v) => String(v)}
            />
            <AreaChartCard
              title="Faturamento 12 Meses"
              data={faturamento12m}
              dataKey="valor"
              color="#6366f1"
            />
          </div>
        </>
      )}
    </div>
  )
}
