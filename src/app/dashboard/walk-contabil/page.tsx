'use client'

import { Building2, FileWarning, FileText, Users, DollarSign } from 'lucide-react'
import KPICard from '@/components/dashboard/KPICard'
import ComposedChartCard from '@/components/charts/ComposedChartCard'
import AlertList from '@/components/dashboard/AlertList'
import { formatBRL, formatNumber } from '@/lib/utils/formatters'

// --- Mock Data ---

const MESES = ['Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez','Jan','Fev','Mar']

const cumpridasPendentes12m = MESES.map((mes, i) => ({
  dia: mes,
  cumpridas: [28, 30, 32, 29, 31, 33, 30, 34, 32, 35, 33, 30][i],
  pendentes: [4, 3, 2, 5, 3, 2, 4, 1, 3, 2, 3, 5][i],
}))

const empresas = [
  { nome: 'Walk Holding',   cndFederal: 'green',  cndEstadual: 'green',  cndMunicipal: 'green',  fgts: 'green' },
  { nome: 'Objetivo Seg.',  cndFederal: 'green',  cndEstadual: 'green',  cndMunicipal: 'yellow', fgts: 'green' },
  { nome: 'Oficina Walk',   cndFederal: 'green',  cndEstadual: 'green',  cndMunicipal: 'green',  fgts: 'green' },
  { nome: 'Digital LUX',    cndFederal: 'green',  cndEstadual: 'green',  cndMunicipal: 'green',  fgts: 'green' },
  { nome: 'InibDor SP',     cndFederal: 'green',  cndEstadual: 'yellow', cndMunicipal: 'green',  fgts: 'green' },
  { nome: 'InibDor RJ',     cndFederal: 'red',    cndEstadual: 'green',  cndMunicipal: 'green',  fgts: 'green' },
  { nome: 'Walk Imoveis',   cndFederal: 'green',  cndEstadual: 'green',  cndMunicipal: 'green',  fgts: 'green' },
  { nome: 'Walk Contabil',  cndFederal: 'green',  cndEstadual: 'green',  cndMunicipal: 'green',  fgts: 'green' },
]

const obrigacoesRows = [
  { obrigacao: 'DCTF Mensal', empresa: 'Walk Holding', deadline: '15/03/2026', status: 'Vencido', responsavel: 'Maria S.' },
  { obrigacao: 'EFD-Contribuicoes', empresa: 'InibDor RJ', deadline: '20/03/2026', status: 'Pendente', responsavel: 'Carlos R.' },
  { obrigacao: 'GFIP/SEFIP', empresa: 'Objetivo Seg.', deadline: '07/04/2026', status: 'Em andamento', responsavel: 'Ana L.' },
  { obrigacao: 'ECD', empresa: 'Digital LUX', deadline: '31/05/2026', status: 'Pendente', responsavel: 'Pedro M.' },
  { obrigacao: 'DIRF', empresa: 'Oficina Walk', deadline: '28/02/2026', status: 'Vencido', responsavel: 'Maria S.' },
]

const alertasFiscais = [
  { id: '1', severity: 'critical' as const, title: 'CND Federal InibDor RJ irregular - regularizar PGFN', empresa: 'InibDor RJ' },
  { id: '2', severity: 'critical' as const, title: 'DCTF Walk Holding vencida em 15/03', empresa: 'Walk Holding' },
  { id: '3', severity: 'warning' as const, title: 'CND Municipal Objetivo com pendencia - verificar ISS', empresa: 'Objetivo Seg.' },
  { id: '4', severity: 'warning' as const, title: 'CND Estadual InibDor SP proxima do vencimento', empresa: 'InibDor SP' },
  { id: '5', severity: 'info' as const, title: 'EFD-Contribuicoes InibDor RJ vence em 20/03', empresa: 'InibDor RJ' },
  { id: '6', severity: 'info' as const, title: 'Novo prazo ECD prorrogado para 30/06', empresa: 'Todas' },
]

const STATUS_COLORS: Record<string, string> = {
  'Vencido': 'bg-red-400/10 text-red-400 border-red-400/20',
  'Pendente': 'bg-amber-400/10 text-amber-400 border-amber-400/20',
  'Em andamento': 'bg-blue-400/10 text-blue-400 border-blue-400/20',
  'Entregue': 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
}

const SEMAFORO: Record<string, string> = {
  green: 'bg-emerald-400/20 text-emerald-400 border-emerald-400/30',
  yellow: 'bg-amber-400/20 text-amber-400 border-amber-400/30',
  red: 'bg-red-400/20 text-red-400 border-red-400/30',
}

const SEMAFORO_LABEL: Record<string, string> = {
  green: 'Regular',
  yellow: 'Atencao',
  red: 'Irregular',
}

function daysUntil(dateStr: string): number {
  const [d, m, y] = dateStr.split('/').map(Number)
  const target = new Date(y, m - 1, d)
  const now = new Date(2026, 2, 19) // 19/03/2026
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

// --- Page ---

export default function WalkContabilPage() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <KPICard title="Empresas Atendidas" value="8" icon={<Building2 size={16} />} delay={0} />
        <KPICard
          title="Obrigacoes Pendentes"
          value="5"
          subtitle="Proxima vence em 1 dia"
          icon={<FileWarning size={16} />}
          delay={1}
        />
        <KPICard title="Guias Emitidas" value="234" change={5.2} icon={<FileText size={16} />} delay={2} />
        <KPICard title="Folhas Processadas" value="8" subtitle="Todas empresas" icon={<Users size={16} />} delay={3} />
        <KPICard title="Receita" value={formatBRL(42000)} change={3.8} icon={<DollarSign size={16} />} delay={4} />
      </div>

      {/* Certidoes Grid */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
        <h3 className="text-sm text-white/60 mb-4">Painel de Certidoes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 border-b border-[#27272a]">
                <th className="text-left py-2 px-3">Empresa</th>
                <th className="text-center py-2 px-3">CND Federal</th>
                <th className="text-center py-2 px-3">CND Estadual</th>
                <th className="text-center py-2 px-3">CND Municipal</th>
                <th className="text-center py-2 px-3">FGTS</th>
              </tr>
            </thead>
            <tbody>
              {empresas.map((e, i) => (
                <tr key={i} className="border-b border-[#27272a]/50 text-white/80">
                  <td className="py-2.5 px-3 font-medium">{e.nome}</td>
                  {(['cndFederal', 'cndEstadual', 'cndMunicipal', 'fgts'] as const).map(cert => (
                    <td key={cert} className="py-2.5 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs border ${SEMAFORO[e[cert]]}`}>
                        {SEMAFORO_LABEL[e[cert]]}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Obrigacoes Table */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
        <h3 className="text-sm text-white/60 mb-4">Obrigacoes Fiscais</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 border-b border-[#27272a]">
                <th className="text-left py-2 px-3">Obrigacao</th>
                <th className="text-left py-2 px-3">Empresa</th>
                <th className="text-left py-2 px-3">Deadline</th>
                <th className="text-left py-2 px-3">Status</th>
                <th className="text-left py-2 px-3">Responsavel</th>
              </tr>
            </thead>
            <tbody>
              {obrigacoesRows.map((o, i) => {
                const days = daysUntil(o.deadline)
                const isVencido = o.status === 'Vencido'
                return (
                  <tr key={i} className={`border-b border-[#27272a]/50 ${isVencido ? 'text-red-400' : 'text-white/80'}`}>
                    <td className="py-2.5 px-3 font-medium">{o.obrigacao}</td>
                    <td className="py-2.5 px-3">{o.empresa}</td>
                    <td className="py-2.5 px-3">
                      <span>{o.deadline}</span>
                      {!isVencido && days > 0 && (
                        <span className="ml-2 text-xs text-white/30">({days}d)</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs border ${STATUS_COLORS[o.status]}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">{o.responsavel}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alertas + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AlertList alerts={alertasFiscais} />
        <ComposedChartCard
          title="Cumpridas vs Pendentes (mensal)"
          data={cumpridasPendentes12m}
          bars={[
            { key: 'cumpridas', color: '#10b981', name: 'Cumpridas' },
            { key: 'pendentes', color: '#ef4444', name: 'Pendentes' },
          ]}
          valueFormatter={formatNumber}
        />
      </div>
    </div>
  )
}
