'use client'

import { useState } from 'react'
import { Users, DollarSign, Target, MousePointer, FileText, TrendingUp, Percent, CreditCard } from 'lucide-react'
import KPICard from '@/components/dashboard/KPICard'
import BarChartCard from '@/components/charts/BarChartCard'
import AreaChartCard from '@/components/charts/AreaChartCard'
import PieChartCard from '@/components/charts/PieChartCard'
import ComposedChartCard from '@/components/charts/ComposedChartCard'
import { formatBRL, formatNumber } from '@/lib/utils/formatters'
import { ESSENCIA_MOCK } from '@/lib/mock/empresas-mock/essencia'

const TABS = ['Performance', 'Despesas']

const { kpis, perfClientes, receita12m, despesas, despesasCategoria, despesasReceita12m } = ESSENCIA_MOCK

const leadsCliente = perfClientes.map(c => ({ name: c.cliente, value: c.leads, color: '#6366f1' }))
const roasCliente = perfClientes.map(c => ({ dia: c.cliente, roas: c.roas, meta: 4.0 }))

const statusColor: Record<string, string> = {
  'Pago': 'bg-emerald-500/20 text-emerald-400',
  'Pendente': 'bg-amber-500/20 text-amber-400',
  'Atrasado': 'bg-red-500/20 text-red-400',
}

export default function EssenciaMarketingPage() {
  const [tab, setTab] = useState('Performance')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Ess\u00eancia Marketing</h1>
        <p className="text-white/40 text-sm">Ag\u00eancia de marketing digital</p>
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

      {/* ═══ PERFORMANCE ═══ */}
      {tab === 'Performance' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <KPICard title="Clientes Ativos" value={String(kpis.clientesAtivos)} icon={<Users size={16} />} delay={0} />
            <KPICard title="Investimento Tráfego" value={formatBRL(kpis.investimentoTrafego)} change={5.3} icon={<DollarSign size={16} />} delay={1} />
            <KPICard title="ROAS" value={`${kpis.roas.toFixed(1)}x`} progress={Math.round(kpis.roas * 20)} progressColor="#10b981" icon={<Target size={16} />} delay={2} />
            <KPICard title="CPL" value={formatBRL(kpis.cpl)} change={-6.7} subtitle="Custo por Lead" icon={<MousePointer size={16} />} delay={3} />
            <KPICard title="Conteúdos/Mês" value={String(kpis.conteudosMes)} change={12.3} icon={<FileText size={16} />} delay={4} />
            <KPICard title="Receita" value={formatBRL(kpis.receita)} subtitle="Fee + Variável" change={8.2} icon={<TrendingUp size={16} />} delay={5} />
          </div>

          {/* Performance por Cliente */}
          <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
            <h3 className="text-sm text-white/60 mb-4">Performance por Cliente</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#27272a] text-white/40 text-xs uppercase">
                    <th className="text-left py-2 px-3">Cliente</th>
                    <th className="text-right py-2 px-3">Investimento</th>
                    <th className="text-right py-2 px-3">Leads</th>
                    <th className="text-right py-2 px-3">CPL</th>
                    <th className="text-right py-2 px-3">ROAS</th>
                    <th className="text-right py-2 px-3">Engajamento</th>
                  </tr>
                </thead>
                <tbody>
                  {perfClientes.map((c, i) => (
                    <tr key={i} className="border-b border-[#27272a]/50 hover:bg-white/[0.02] transition-colors">
                      <td className="py-2 px-3 text-white font-medium">{c.cliente}</td>
                      <td className="py-2 px-3 text-right text-white/80">{formatBRL(c.investimento)}</td>
                      <td className="py-2 px-3 text-right text-white/80">{formatNumber(c.leads)}</td>
                      <td className="py-2 px-3 text-right">
                        <span className={`font-medium ${c.cpl <= 30 ? 'text-emerald-400' : c.cpl <= 36 ? 'text-amber-400' : 'text-red-400'}`}>
                          {formatBRL(c.cpl)}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        <span className={`font-medium ${c.roas >= 4.5 ? 'text-emerald-400' : c.roas >= 3.5 ? 'text-amber-400' : 'text-red-400'}`}>
                          {c.roas.toFixed(1)}x
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        <span className={`font-medium ${c.engajamento >= 6 ? 'text-emerald-400' : c.engajamento >= 4 ? 'text-amber-400' : 'text-white/60'}`}>
                          {c.engajamento.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <BarChartCard
              title="Leads por Cliente"
              data={leadsCliente}
              valueFormatter={(v) => String(v)}
            />
            <ComposedChartCard
              title="ROAS por Cliente + Meta"
              data={roasCliente}
              bars={[{ key: 'roas', color: '#6366f1', name: 'ROAS' }]}
              lines={[{ key: 'meta', color: '#ef4444', name: 'Meta' }]}
              valueFormatter={(v) => `${v.toFixed(1)}x`}
            />
            <AreaChartCard
              title="Receita \u2014 12 Meses"
              data={receita12m}
              dataKey="valor"
              color="#10b981"
            />
          </div>
        </>
      )}

      {/* ═══ DESPESAS ═══ */}
      {tab === 'Despesas' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPICard title="Total Despesas" value={formatBRL(kpis.totalDespesas)} change={3.2} icon={<CreditCard size={16} />} delay={0} />
            <KPICard title="Fixas vs Variáveis" value="60% / 40%" subtitle="R$ 76.200 fixas | R$ 50.800 var." icon={<Percent size={16} />} delay={1} />
            <KPICard title="Margem Operacional" value={`${kpis.margemOperacional}%`} progress={kpis.margemOperacional} progressColor="#10b981" icon={<TrendingUp size={16} />} delay={2} />
            <KPICard title="Receita" value={formatBRL(kpis.receita)} subtitle="Referência mensal" icon={<DollarSign size={16} />} delay={3} />
          </div>

          {/* Tabela de Despesas */}
          <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
            <h3 className="text-sm text-white/60 mb-4">Despesas</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#27272a] text-white/40 text-xs uppercase">
                    <th className="text-left py-2 px-3">Data</th>
                    <th className="text-left py-2 px-3">Categoria</th>
                    <th className="text-left py-2 px-3">Descri\u00e7\u00e3o</th>
                    <th className="text-right py-2 px-3">Valor</th>
                    <th className="text-left py-2 px-3">Forma Pgto</th>
                    <th className="text-left py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {despesas.map((d, i) => (
                    <tr key={i} className="border-b border-[#27272a]/50 hover:bg-white/[0.02] transition-colors">
                      <td className="py-2 px-3 text-white/80">{d.data}</td>
                      <td className="py-2 px-3">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/70">{d.categoria}</span>
                      </td>
                      <td className="py-2 px-3 text-white">{d.descricao}</td>
                      <td className="py-2 px-3 text-right text-red-400 font-medium">{formatBRL(d.valor)}</td>
                      <td className="py-2 px-3 text-white/60">{d.formaPgto}</td>
                      <td className="py-2 px-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[d.status] || 'bg-white/10 text-white/60'}`}>
                          {d.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <PieChartCard
              title="Despesas por Categoria"
              data={despesasCategoria}
            />
            <ComposedChartCard
              title="Despesas vs Receita \u2014 12 Meses"
              data={despesasReceita12m}
              bars={[{ key: 'despesas', color: '#ef4444', name: 'Despesas' }]}
              lines={[{ key: 'receita', color: '#10b981', name: 'Receita' }]}
            />
          </div>
        </>
      )}
    </div>
  )
}
