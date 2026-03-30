'use client'

import { Users, Phone, PhoneOff, FileText, DollarSign, TrendingUp, UserCheck, Star } from 'lucide-react'
import KPICard from '@/components/dashboard/KPICard'
import BarChartCard from '@/components/charts/BarChartCard'
import AreaChartCard from '@/components/charts/AreaChartCard'
import { formatBRL, formatNumber } from '@/lib/utils/formatters'

/* ── Mock: Funil SDR \u2192 Closer \u2192 Fechamento ── */
const funilVendas = [
  { name: 'Leads', value: 340, color: '#6366f1' },
  { name: 'SDR Qualificado', value: 180, color: '#818cf8' },
  { name: 'Calls Agendadas', value: 89, color: '#a78bfa' },
  { name: 'Calls Realizadas', value: 72, color: '#c4b5fd' },
  { name: 'Propostas', value: 35, color: '#ddd6fe' },
  { name: 'Contratos Fechados', value: 18, color: '#10b981' },
]

/* ── Mock: Receita Recorrente vs Pontual 12m (stacked area) ── */
const receita12m = [
  { mes: 'Abr', recorrente: 110000, pontual: 60000 },
  { mes: 'Mai', recorrente: 115000, pontual: 55000 },
  { mes: 'Jun', recorrente: 120000, pontual: 65000 },
  { mes: 'Jul', recorrente: 118000, pontual: 58000 },
  { mes: 'Ago', recorrente: 125000, pontual: 62000 },
  { mes: 'Set', recorrente: 128000, pontual: 70000 },
  { mes: 'Out', recorrente: 130000, pontual: 68000 },
  { mes: 'Nov', recorrente: 132000, pontual: 72000 },
  { mes: 'Dez', recorrente: 135000, pontual: 75000 },
  { mes: 'Jan', recorrente: 133000, pontual: 70000 },
  { mes: 'Fev', recorrente: 136000, pontual: 73000 },
  { mes: 'Mar', recorrente: 136500, pontual: 73500 },
]

/* ── Mock: NPS 12m ── */
const nps12m = [
  { mes: 'Abr', valor: 8.5 },
  { mes: 'Mai', valor: 8.7 },
  { mes: 'Jun', valor: 8.9 },
  { mes: 'Jul', valor: 8.8 },
  { mes: 'Ago', valor: 9.0 },
  { mes: 'Set', valor: 8.9 },
  { mes: 'Out', valor: 9.0 },
  { mes: 'Nov', valor: 9.1 },
  { mes: 'Dez', valor: 9.0 },
  { mes: 'Jan', valor: 9.1 },
  { mes: 'Fev', valor: 9.0 },
  { mes: 'Mar', valor: 9.1 },
]

/* ── Mock: Pipeline Eventos ── */
const pipelineEventos = [
  { evento: 'Confer\u00eancia Tech SP', data: '15/04/2026', local: 'S\u00e3o Paulo', status: 'Confirmado', receita: 45000 },
  { evento: 'Workshop Log\u00edstica', data: '22/04/2026', local: 'Curitiba', status: 'Em negocia\u00e7\u00e3o', receita: 28000 },
  { evento: 'Feira Agro 2026', data: '10/05/2026', local: 'Goi\u00e2nia', status: 'Proposta enviada', receita: 62000 },
  { evento: 'Summit Seguros', data: '28/05/2026', local: 'Rio de Janeiro', status: 'Confirmado', receita: 38000 },
  { evento: 'Hackathon IoT', data: '15/06/2026', local: 'Belo Horizonte', status: 'Lead', receita: 15000 },
]

/* ── Mock: Conte\u00fados por Cliente ── */
const conteudosCliente = [
  { cliente: 'Trilho Solu\u00e7\u00f5es', posts: 24, videos: 8, emails: 12, engajamento: '4.2%' },
  { cliente: 'TrackIt', posts: 18, videos: 6, emails: 10, engajamento: '3.8%' },
  { cliente: 'Objetivo Seguros', posts: 20, videos: 4, emails: 15, engajamento: '5.1%' },
  { cliente: 'InibDor', posts: 30, videos: 12, emails: 20, engajamento: '6.3%' },
  { cliente: 'Walk Holding', posts: 12, videos: 3, emails: 8, engajamento: '3.5%' },
]

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
        <KPICard title="Leads Funil" value="340" change={15.2} icon={<Users size={16} />} delay={0} />
        <KPICard title="Calls Agendadas" value="89" icon={<Phone size={16} />} delay={1} />
        <KPICard title="Calls Realizadas" value="72" subtitle="No-show 19%" icon={<PhoneOff size={16} />} delay={2} />
        <KPICard title="Contratos Fechados" value="18" change={20.0} icon={<FileText size={16} />} delay={3} />
        <KPICard title="Ticket M\u00e9dio" value={formatBRL(4500)} icon={<DollarSign size={16} />} delay={4} />
        <KPICard title="Receita" value={formatBRL(210000)} subtitle="Recorrente 65% | Pontual 35%" change={6.8} icon={<TrendingUp size={16} />} delay={5} />
        <KPICard title="Clientes Ativos" value="45" change={4.7} icon={<UserCheck size={16} />} delay={6} />
        <KPICard title="NPS" value="9.1" progress={91} progressColor="#10b981" icon={<Star size={16} />} delay={7} />
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
