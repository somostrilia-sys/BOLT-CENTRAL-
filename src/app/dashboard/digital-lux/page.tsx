'use client'

import { Code2, Server, Cpu, Zap, PiggyBank, Rocket, Bug } from 'lucide-react'
import KPICard from '@/components/dashboard/KPICard'
import PieChartCard from '@/components/charts/PieChartCard'
import ComposedChartCard from '@/components/charts/ComposedChartCard'
import AreaChartCard from '@/components/charts/AreaChartCard'
import { formatBRL, formatNumber } from '@/lib/utils/formatters'
import { DIGITAL_LUX_MOCK } from '@/lib/mock/empresas-mock/digital-lux'

const { kpis, custoInfraPie, deploysBacklog12m, economiaGerada12m, backlogRows, projetosRows } = DIGITAL_LUX_MOCK

const PRIORIDADE_COLORS: Record<string, string> = {
  'Crítica': 'bg-red-400/10 text-red-400 border-red-400/20',
  'Alta': 'bg-amber-400/10 text-amber-400 border-amber-400/20',
  'Média': 'bg-blue-400/10 text-blue-400 border-blue-400/20',
  'Baixa': 'bg-white/5 text-white/50 border-white/10',
}

const STATUS_COLORS: Record<string, string> = {
  'Em progresso': 'bg-blue-400/10 text-blue-400 border-blue-400/20',
  'Bloqueado': 'bg-red-400/10 text-red-400 border-red-400/20',
  'Pendente': 'bg-amber-400/10 text-amber-400 border-amber-400/20',
}

// --- Page ---

export default function DigitalLuxPage() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        <KPICard title="Projetos Ativos" value={String(kpis.projetosAtivos)} icon={<Code2 size={16} />} delay={0} />
        <KPICard title="Uptime" value={`${kpis.uptime.toFixed(1).replace('.', ',')}%`} change={0.2} icon={<Server size={16} />} delay={1} />
        <KPICard title="Custo Infra" value={formatBRL(kpis.custoInfra)} subtitle="APIs + servidores + tokens" icon={<Cpu size={16} />} delay={2} />
        <KPICard title="Automações Ativas" value={String(kpis.automacoesAtivas)} change={4.2} icon={<Zap size={16} />} delay={3} />
        <KPICard title="Economia Gerada" value={formatBRL(kpis.economiaGerada)} change={8.5} icon={<PiggyBank size={16} />} delay={4} />
        <KPICard title="Deploys/mês" value={String(kpis.deploysPerMes)} change={6.1} icon={<Rocket size={16} />} delay={5} />
        <KPICard title="Tickets Backlog" value={String(kpis.ticketsBacklog)} change={-12} icon={<Bug size={16} />} delay={6} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <PieChartCard
          title="Custo Infra - Breakdown"
          data={custoInfraPie}
        />
        <ComposedChartCard
          title="Deploys + Backlog (12 meses)"
          data={deploysBacklog12m}
          bars={[{ key: 'deploys', color: '#6366f1', name: 'Deploys' }]}
          lines={[{ key: 'backlog', color: '#ef4444', name: 'Backlog' }]}
          valueFormatter={formatNumber}
        />
        <AreaChartCard
          title="Economia Gerada (12 meses)"
          data={economiaGerada12m}
          dataKey="economia"
          color="#10b981"
        />
      </div>

      {/* Table: Backlog */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
        <h3 className="text-sm text-white/60 mb-4">Backlog de Tickets</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 border-b border-[#27272a]">
                <th className="text-left py-2 px-3">Ticket</th>
                <th className="text-left py-2 px-3">Projeto</th>
                <th className="text-left py-2 px-3">Prioridade</th>
                <th className="text-left py-2 px-3">Status</th>
                <th className="text-left py-2 px-3">Responsavel</th>
              </tr>
            </thead>
            <tbody>
              {backlogRows.map((r, i) => (
                <tr key={i} className="border-b border-[#27272a]/50 text-white/80">
                  <td className="py-2.5 px-3 font-mono text-xs">{r.ticket}</td>
                  <td className="py-2.5 px-3">{r.projeto}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs border ${PRIORIDADE_COLORS[r.prioridade]}`}>
                      {r.prioridade}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs border ${STATUS_COLORS[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">{r.responsavel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table: Projetos */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
        <h3 className="text-sm text-white/60 mb-4">Projetos</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 border-b border-[#27272a]">
                <th className="text-left py-2 px-3">Nome</th>
                <th className="text-left py-2 px-3">Cliente</th>
                <th className="text-left py-2 px-3">Fase</th>
                <th className="text-left py-2 px-3">Conclusao</th>
                <th className="text-right py-2 px-3">Receita</th>
              </tr>
            </thead>
            <tbody>
              {projetosRows.map((p, i) => (
                <tr key={i} className="border-b border-[#27272a]/50 text-white/80">
                  <td className="py-2.5 px-3 font-medium">{p.nome}</td>
                  <td className="py-2.5 px-3 text-white/50">{p.cliente}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-indigo-400/10 text-indigo-400 border border-indigo-400/20">
                      {p.fase}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${p.conclusao}%`,
                            backgroundColor: p.conclusao === 100 ? '#10b981' : p.conclusao >= 60 ? '#6366f1' : '#f59e0b',
                          }}
                        />
                      </div>
                      <span className="text-xs text-white/40 w-8 text-right">{p.conclusao}%</span>
                    </div>
                  </td>
                  <td className="text-right py-2.5 px-3">{formatBRL(p.receita)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
