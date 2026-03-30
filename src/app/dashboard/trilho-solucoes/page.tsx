'use client'

import { useState } from 'react'
import { Truck, Phone, Clock, Wrench, CheckCircle, DollarSign, UserPlus, Settings, TrendingUp } from 'lucide-react'
import KPICard from '@/components/dashboard/KPICard'
import BarChartCard from '@/components/charts/BarChartCard'
import PieChartCard from '@/components/charts/PieChartCard'
import AreaChartCard from '@/components/charts/AreaChartCard'
import { formatBRL, formatNumber } from '@/lib/utils/formatters'
import { TRILHO_MOCK } from '@/lib/mock/empresas-mock/trilho'

const TABS = ['Operacional', 'Comercial']

const { chamadosHora, tipoChamado, tma30d, pipelineFunil, faturamento12m, kpis } = TRILHO_MOCK

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
            <KPICard title="Veículos Monitorados" value={formatNumber(kpis.veiculosMonitorados)} change={3.2} icon={<Truck size={16} />} delay={0} />
            <KPICard title="Chamados 24h" value={String(kpis.chamados24h)} change={-5.6} icon={<Phone size={16} />} delay={1} />
            <KPICard title="TMA" value={kpis.tma} subtitle="Tempo Médio Atendimento" icon={<Clock size={16} />} delay={2} />
            <KPICard title="Tempo Reboque" value={kpis.tempoReboque} subtitle="Média de chegada" icon={<Wrench size={16} />} delay={3} />
            <KPICard title="Resolução 1º Contato" value={`${kpis.resolucao1Contato}%`} progress={kpis.resolucao1Contato} progressColor="#10b981" icon={<CheckCircle size={16} />} delay={4} />
            <KPICard title="Custo/Acionamento" value={formatBRL(kpis.custoAcionamento)} change={-2.1} icon={<DollarSign size={16} />} delay={5} />
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
            <KPICard title="Novas Associações" value={String(kpis.novasAssociacoes)} change={12.5} icon={<UserPlus size={16} />} delay={0} />
            <KPICard title="Em Implantação" value={String(kpis.emImplantacao)} icon={<Settings size={16} />} delay={1} />
            <KPICard title="Receita Recorrente/Assoc." value={formatBRL(kpis.receitaRecorrenteAssoc)} change={4.1} icon={<TrendingUp size={16} />} delay={2} />
            <KPICard title="Faturamento" value={formatBRL(kpis.faturamento)} change={8.3} progress={85} progressColor="#6366f1" icon={<DollarSign size={16} />} delay={3} />
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
