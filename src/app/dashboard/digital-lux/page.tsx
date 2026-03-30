'use client'

import { Code2, Server, Cpu, Zap, PiggyBank, Rocket, Bug } from 'lucide-react'
import KPICard from '@/components/dashboard/KPICard'
import PieChartCard from '@/components/charts/PieChartCard'
import ComposedChartCard from '@/components/charts/ComposedChartCard'
import AreaChartCard from '@/components/charts/AreaChartCard'
import { formatBRL, formatNumber } from '@/lib/utils/formatters'

// --- Mock Data ---

const MESES = ['Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez','Jan','Fev','Mar']

const custoInfraPie = [
  { name: 'APIs', value: 11900, color: '#6366f1' },
  { name: 'Servidores', value: 8500, color: '#8b5cf6' },
  { name: 'Tokens LLM', value: 6800, color: '#a78bfa' },
  { name: 'Ferramentas', value: 6800, color: '#c4b5fd' },
]

const deploysBacklog12m = MESES.map((mes, i) => ({
  dia: mes,
  deploys: [28, 32, 35, 30, 38, 36, 40, 44, 39, 41, 45, 42][i],
  backlog: [22, 20, 18, 21, 17, 19, 16, 14, 18, 16, 13, 15][i],
}))

const economiaGerada12m = MESES.map((mes, i) => ({
  mes,
  economia: [52000, 55000, 58000, 60000, 64000, 68000, 71000, 74000, 78000, 82000, 85000, 89000][i],
}))

const backlogRows = [
  { ticket: 'DLX-412', projeto: 'Walk Contábil', prioridade: 'Alta', status: 'Em progresso', responsavel: 'Lucas M.' },
  { ticket: 'DLX-408', projeto: 'InibDor Bot', prioridade: 'Crítica', status: 'Bloqueado', responsavel: 'Ana P.' },
  { ticket: 'DLX-405', projeto: 'Portal Oficina', prioridade: 'Média', status: 'Pendente', responsavel: 'Rafael S.' },
  { ticket: 'DLX-401', projeto: 'Objetivo Seg.', prioridade: 'Baixa', status: 'Pendente', responsavel: 'Carla D.' },
  { ticket: 'DLX-398', projeto: 'Walk Panel', prioridade: 'Alta', status: 'Em progresso', responsavel: 'Lucas M.' },
]

const projetosRows = [
  { nome: 'Walk Holding Panel', cliente: 'Walk Holding', fase: 'Produção', conclusao: 92, receita: 18000 },
  { nome: 'InibDor Chatbot', cliente: 'InibDor', fase: 'Desenvolvimento', conclusao: 65, receita: 24000 },
  { nome: 'Portal Oficina', cliente: 'Oficina Walk', fase: 'MVP', conclusao: 40, receita: 12000 },
  { nome: 'Sistema Contábil', cliente: 'Walk Contábil', fase: 'Planejamento', conclusao: 15, receita: 8000 },
  { nome: 'App Objetivo', cliente: 'Objetivo Seg.', fase: 'Manutenção', conclusao: 100, receita: 6000 },
]

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
        <KPICard title="Projetos Ativos" value="8" icon={<Code2 size={16} />} delay={0} />
        <KPICard title="Uptime" value="99,7%" change={0.2} icon={<Server size={16} />} delay={1} />
        <KPICard title="Custo Infra" value={formatBRL(34000)} subtitle="APIs + servidores + tokens" icon={<Cpu size={16} />} delay={2} />
        <KPICard title="Automacoes Ativas" value="23" change={4.2} icon={<Zap size={16} />} delay={3} />
        <KPICard title="Economia Gerada" value={formatBRL(89000)} change={8.5} icon={<PiggyBank size={16} />} delay={4} />
        <KPICard title="Deploys/mes" value="42" change={6.1} icon={<Rocket size={16} />} delay={5} />
        <KPICard title="Tickets Backlog" value="15" change={-12} icon={<Bug size={16} />} delay={6} />
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
