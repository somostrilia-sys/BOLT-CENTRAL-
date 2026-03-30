'use client'

import { Users, Phone, PhoneOff, FileText, DollarSign, TrendingUp, UserCheck, Star } from 'lucide-react'
import KPICard from '@/components/dashboard/KPICard'
import BarChartCard from '@/components/charts/BarChartCard'
import AreaChartCard from '@/components/charts/AreaChartCard'
import { formatBRL, formatNumber } from '@/lib/utils/formatters'
import { TRILIA_MOCK } from '@/lib/mock/empresas-mock/trilia'

const { kpis, funilVendas, receita12m, nps12m, pipelineEventos, conteudosCliente } = TRILIA_MOCK

const statusColor: Record<string, string> = {
  'Confirmado': 'bg-emerald-500/20 text-emerald-400',
  'Em negocia\u00e7\u00e3o': 'bg-amber-500/20 text-amber-400',
  'Proposta enviada': 'bg-indigo-500/20 text-indigo-400',
  'Lead': 'bg-white/10 text-white/60',
}

export default function TriliaPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Trilia</h1>
        <p className="text-white/40 text-sm">Ag\u00eancia de eventos &amp; conte\u00fado</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <KPICard title="Leads Funil" value={String(kpis.leadsFunil)} change={15.2} icon={<Users size={16} />} delay={0} />
        <KPICard title="Calls Agendadas" value={String(kpis.callsAgendadas)} icon={<Phone size={16} />} delay={1} />
        <KPICard title="Calls Realizadas" value={String(kpis.callsRealizadas)} subtitle="No-show 19%" icon={<PhoneOff size={16} />} delay={2} />
        <KPICard title="Contratos Fechados" value={String(kpis.contratosFechados)} change={20.0} icon={<FileText size={16} />} delay={3} />
        <KPICard title="Ticket Médio" value={formatBRL(kpis.ticketMedio)} icon={<DollarSign size={16} />} delay={4} />
        <KPICard title="Receita" value={formatBRL(kpis.receita)} subtitle="Recorrente 65% | Pontual 35%" change={6.8} icon={<TrendingUp size={16} />} delay={5} />
        <KPICard title="Clientes Ativos" value={String(kpis.clientesAtivos)} change={4.7} icon={<UserCheck size={16} />} delay={6} />
        <KPICard title="NPS" value={String(kpis.nps)} progress={Math.round(kpis.nps * 10)} progressColor="#10b981" icon={<Star size={16} />} delay={7} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <BarChartCard
          title="Funil SDR \u2192 Closer \u2192 Fechamento"
          data={funilVendas}
          valueFormatter={(v) => String(v)}
        />
        <AreaChartCard
          title="Receita Recorrente vs Pontual \u2014 12 Meses"
          data={receita12m}
          dataKey="recorrente"
          metaKey="pontual"
          color="#6366f1"
        />
        <AreaChartCard
          title="NPS \u2014 12 Meses"
          data={nps12m}
          dataKey="valor"
          color="#10b981"
          valueFormatter={(v) => v.toFixed(1)}
        />
      </div>

      {/* Pipeline Eventos */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
        <h3 className="text-sm text-white/60 mb-4">Pipeline Eventos</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#27272a] text-white/40 text-xs uppercase">
                <th className="text-left py-2 px-3">Evento</th>
                <th className="text-left py-2 px-3">Data</th>
                <th className="text-left py-2 px-3">Local</th>
                <th className="text-left py-2 px-3">Status</th>
                <th className="text-right py-2 px-3">Receita</th>
              </tr>
            </thead>
            <tbody>
              {pipelineEventos.map((e, i) => (
                <tr key={i} className="border-b border-[#27272a]/50 hover:bg-white/[0.02] transition-colors">
                  <td className="py-2 px-3 text-white font-medium">{e.evento}</td>
                  <td className="py-2 px-3 text-white/80">{e.data}</td>
                  <td className="py-2 px-3 text-white/80">{e.local}</td>
                  <td className="py-2 px-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[e.status] || 'bg-white/10 text-white/60'}`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right text-emerald-400 font-medium">{formatBRL(e.receita)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Conte\u00fados por Cliente */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
        <h3 className="text-sm text-white/60 mb-4">Conte\u00fados por Cliente</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#27272a] text-white/40 text-xs uppercase">
                <th className="text-left py-2 px-3">Cliente</th>
                <th className="text-right py-2 px-3">Posts</th>
                <th className="text-right py-2 px-3">V\u00eddeos</th>
                <th className="text-right py-2 px-3">E-mails</th>
                <th className="text-right py-2 px-3">Engajamento</th>
              </tr>
            </thead>
            <tbody>
              {conteudosCliente.map((c, i) => (
                <tr key={i} className="border-b border-[#27272a]/50 hover:bg-white/[0.02] transition-colors">
                  <td className="py-2 px-3 text-white font-medium">{c.cliente}</td>
                  <td className="py-2 px-3 text-right text-white/80">{c.posts}</td>
                  <td className="py-2 px-3 text-right text-white/80">{c.videos}</td>
                  <td className="py-2 px-3 text-right text-white/80">{c.emails}</td>
                  <td className="py-2 px-3 text-right">
                    <span className={`font-medium ${parseFloat(c.engajamento) >= 5 ? 'text-emerald-400' : parseFloat(c.engajamento) >= 4 ? 'text-amber-400' : 'text-white/60'}`}>
                      {c.engajamento}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
