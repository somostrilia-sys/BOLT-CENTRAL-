'use client'

import { useState } from 'react'
import { Users, DollarSign, Target, MousePointer, FileText, TrendingUp, Percent, CreditCard } from 'lucide-react'
import KPICard from '@/components/dashboard/KPICard'
import BarChartCard from '@/components/charts/BarChartCard'
import AreaChartCard from '@/components/charts/AreaChartCard'
import PieChartCard from '@/components/charts/PieChartCard'
import ComposedChartCard from '@/components/charts/ComposedChartCard'
import { formatBRL, formatNumber } from '@/lib/utils/formatters'

const TABS = ['Performance', 'Despesas']

/* ── Mock: Performance por Cliente ── */
const perfClientes = [
  { cliente: 'InibDor', investimento: 25000, leads: 680, cpl: 36.76, roas: 5.1, engajamento: 7.2 },
  { cliente: 'Trilho Solu\u00e7\u00f5es', investimento: 18000, leads: 520, cpl: 34.62, roas: 4.8, engajamento: 5.8 },
  { cliente: 'TrackIt', investimento: 15000, leads: 410, cpl: 36.59, roas: 3.9, engajamento: 4.1 },
  { cliente: 'Objetivo Seguros', investimento: 20000, leads: 890, cpl: 22.47, roas: 4.5, engajamento: 6.4 },
  { cliente: 'Walk Holding', investimento: 11000, leads: 310, cpl: 35.48, roas: 3.2, engajamento: 3.9 },
]

/* ── Mock: Leads por Cliente (bar) ── */
const leadsCliente = perfClientes.map(c => ({
  name: c.cliente,
  value: c.leads,
  color: '#6366f1',
}))

/* ── Mock: ROAS por Cliente + Meta (composed) ── */
const roasCliente = perfClientes.map(c => ({
  dia: c.cliente,
  roas: c.roas,
  meta: 4.0,
}))

/* ── Mock: Receita 12m (area) ── */
const receita12m = [
  { mes: 'Abr', valor: 145000 },
  { mes: 'Mai', valor: 150000 },
  { mes: 'Jun', valor: 155000 },
  { mes: 'Jul', valor: 152000 },
  { mes: 'Ago', valor: 160000 },
  { mes: 'Set', valor: 165000 },
  { mes: 'Out', valor: 168000 },
  { mes: 'Nov', valor: 172000 },
  { mes: 'Dez', valor: 178000 },
  { mes: 'Jan', valor: 175000 },
  { mes: 'Fev', valor: 180000 },
  { mes: 'Mar', valor: 185000 },
]

/* ── Mock: Despesas ── */
const despesas = [
  { data: '01/03/2026', categoria: 'Tr\u00e1fego Pago', descricao: 'Meta Ads \u2014 InibDor', valor: 25000, formaPgto: 'Cart\u00e3o', status: 'Pago' },
  { data: '05/03/2026', categoria: 'Ferramentas', descricao: 'HubSpot + SEMrush', valor: 4800, formaPgto: 'Boleto', status: 'Pago' },
  { data: '10/03/2026', categoria: 'Equipe', descricao: 'Sal\u00e1rios + encargos', valor: 62000, formaPgto: 'Transfer\u00eancia', status: 'Pago' },
  { data: '12/03/2026', categoria: 'Freelancers', descricao: 'Designer + Videomaker', valor: 18000, formaPgto: 'PIX', status: 'Pendente' },
  { data: '15/03/2026', categoria: 'Infraestrutura', descricao: 'Hosting + CDN + Domínios', valor: 3200, formaPgto: 'Cart\u00e3o', status: 'Pago' },
]

/* ── Mock: Despesas por Categoria (pie) ── */
const despesasCategoria = [
  { name: 'Tr\u00e1fego Pago', value: 45000, color: '#6366f1' },
  { name: 'Ferramentas', value: 8500, color: '#8b5cf6' },
  { name: 'Equipe', value: 62000, color: '#f59e0b' },
  { name: 'Freelancers', value: 18000, color: '#10b981' },
  { name: 'Infraestrutura', value: 3500, color: '#a1a1aa' },
]

/* ── Mock: Despesas vs Receita 12m (composed) ── */
const despesasReceita12m = [
  { dia: 'Abr', despesas: 105000, receita: 145000 },
  { dia: 'Mai', despesas: 108000, receita: 150000 },
  { dia: 'Jun', despesas: 112000, receita: 155000 },
  { dia: 'Jul', despesas: 110000, receita: 152000 },
  { dia: 'Ago', despesas: 115000, receita: 160000 },
  { dia: 'Set', despesas: 118000, receita: 165000 },
  { dia: 'Out', despesas: 120000, receita: 168000 },
  { dia: 'Nov', despesas: 122000, receita: 172000 },
  { dia: 'Dez', despesas: 125000, receita: 178000 },
  { dia: 'Jan', despesas: 123000, receita: 175000 },
  { dia: 'Fev', despesas: 126000, receita: 180000 },
  { dia: 'Mar', despesas: 127000, receita: 185000 },
]

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
            <KPICard title="Clientes Ativos" value="12" icon={<Users size={16} />} delay={0} />
            <KPICard title="Investimento Tr\u00e1fego" value={formatBRL(89000)} change={5.3} icon={<DollarSign size={16} />} delay={1} />
            <KPICard title="ROAS" value="4.2x" progress={84} progressColor="#10b981" icon={<Target size={16} />} delay={2} />
            <KPICard title="CPL" value={formatBRL(28)} change={-6.7} subtitle="Custo por Lead" icon={<MousePointer size={16} />} delay={3} />
            <KPICard title="Conte\u00fados/M\u00eas" value="156" change={12.3} icon={<FileText size={16} />} delay={4} />
            <KPICard title="Receita" value={formatBRL(185000)} subtitle="Fee + Vari\u00e1vel" change={8.2} icon={<TrendingUp size={16} />} delay={5} />
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
            <KPICard title="Total Despesas" value={formatBRL(127000)} change={3.2} icon={<CreditCard size={16} />} delay={0} />
            <KPICard title="Fixas vs Vari\u00e1veis" value="60% / 40%" subtitle="R$ 76.200 fixas | R$ 50.800 var." icon={<Percent size={16} />} delay={1} />
            <KPICard title="Margem Operacional" value="31%" progress={31} progressColor="#10b981" icon={<TrendingUp size={16} />} delay={2} />
            <KPICard title="Receita" value={formatBRL(185000)} subtitle="Refer\u00eancia mensal" icon={<DollarSign size={16} />} delay={3} />
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
