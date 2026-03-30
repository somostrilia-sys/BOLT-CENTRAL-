'use client'

import { useState } from 'react'
import { Shield, Target, TrendingUp, Percent, Users, AlertTriangle } from 'lucide-react'
import KPICard from '@/components/dashboard/KPICard'
import BarChartCard from '@/components/charts/BarChartCard'
import PieChartCard from '@/components/charts/PieChartCard'
import AreaChartCard from '@/components/charts/AreaChartCard'
import { OBJETIVO_MOCK } from '@/lib/mock/empresas-mock/objetivo'
import { formatBRL, formatNumber } from '@/lib/utils/formatters'

const TABS = ['Comercial', 'Financeiro', 'Operacional']

export default function ObjetivoPage() {
  const [tab, setTab] = useState('Comercial')
  const d = OBJETIVO_MOCK

  return (
    <div className="space-y-6">
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

      {tab === 'Comercial' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <KPICard title="Placas Vendidas" value={`${d.comercial.placasVendidas}`} progress={Math.round((d.comercial.placasVendidas / d.comercial.metaPlacas) * 100)} progressColor="#6366f1" subtitle={`Meta: ${d.comercial.metaPlacas}`} icon={<Shield size={16} />} delay={0} />
            <KPICard title="Conversão Funil" value={`${d.comercial.conversaoFunil}%`} change={2.1} icon={<Target size={16} />} delay={1} />
            <KPICard title="Ticket Médio" value={formatBRL(d.comercial.ticketMedio)} change={3.5} icon={<TrendingUp size={16} />} delay={2} />
            <KPICard title="Churn" value={`${d.comercial.churn}%`} change={-0.4} icon={<Percent size={16} />} delay={3} />
            <KPICard title="Placas Líquidas" value={`+${d.comercial.placasLiquidas}`} change={12} icon={<Users size={16} />} delay={4} />
            <KPICard title="Meta" value={`${Math.round((d.comercial.placasVendidas / d.comercial.metaPlacas) * 100)}%`} progress={Math.round((d.comercial.placasVendidas / d.comercial.metaPlacas) * 100)} progressColor="#10b981" delay={5} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <BarChartCard
              title="Funil de Vendas"
              data={d.comercial.funil.map(f => ({ name: f.etapa, value: f.valor, color: '#6366f1' }))}
              valueFormatter={formatNumber}
            />
            <BarChartCard
              title="Vendas Diárias"
              data={d.comercial.vendasDiarias.map(v => ({ name: v.dia, value: v.vendas }))}
              valueFormatter={formatNumber}
            />
          </div>

          {/* Ranking Franquias */}
          <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
            <h3 className="text-sm text-white/60 mb-4">Ranking Franquias</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/40 border-b border-[#27272a]">
                    <th className="text-left py-2 px-3">Franquia</th>
                    <th className="text-right py-2 px-3">Vendas</th>
                    <th className="text-right py-2 px-3">Meta</th>
                    <th className="text-right py-2 px-3">%</th>
                    <th className="text-right py-2 px-3">Receita</th>
                    <th className="text-right py-2 px-3">Inadimpl.</th>
                  </tr>
                </thead>
                <tbody>
                  {d.franquias.map((f, i) => (
                    <tr key={i} className="border-b border-[#27272a]/50 text-white/80">
                      <td className="py-2.5 px-3 font-medium">{f.nome}</td>
                      <td className="text-right py-2.5 px-3">{f.vendas}</td>
                      <td className="text-right py-2.5 px-3 text-white/40">{f.meta}</td>
                      <td className={`text-right py-2.5 px-3 ${f.pct >= 100 ? 'text-emerald-400' : 'text-amber-400'}`}>{f.pct}%</td>
                      <td className="text-right py-2.5 px-3">{formatBRL(f.receita)}</td>
                      <td className={`text-right py-2.5 px-3 ${f.inadimplencia > 10 ? 'text-red-400' : f.inadimplencia > 6 ? 'text-amber-400' : 'text-emerald-400'}`}>{f.inadimplencia}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ranking Consultores */}
          <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
            <h3 className="text-sm text-white/60 mb-4">Ranking Consultores</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/40 border-b border-[#27272a]">
                    <th className="text-left py-2 px-3">#</th>
                    <th className="text-left py-2 px-3">Consultor</th>
                    <th className="text-left py-2 px-3">Franquia</th>
                    <th className="text-right py-2 px-3">Placas</th>
                    <th className="text-right py-2 px-3">Conversão</th>
                    <th className="text-right py-2 px-3">Ticket</th>
                  </tr>
                </thead>
                <tbody>
                  {d.consultores.map((c, i) => (
                    <tr key={i} className="border-b border-[#27272a]/50 text-white/80">
                      <td className="py-2.5 px-3">
                        {i < 3 ? (
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-amber-400/20 text-amber-400' : i === 1 ? 'bg-gray-300/20 text-gray-300' : 'bg-amber-700/20 text-amber-700'}`}>
                            {i + 1}
                          </span>
                        ) : i + 1}
                      </td>
                      <td className="py-2.5 px-3 font-medium">{c.nome}</td>
                      <td className="py-2.5 px-3 text-white/40">{c.franquia}</td>
                      <td className="text-right py-2.5 px-3">{c.placas}</td>
                      <td className="text-right py-2.5 px-3">{c.conversao}%</td>
                      <td className="text-right py-2.5 px-3">{formatBRL(c.ticket)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === 'Financeiro' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <KPICard title="Fat. Bruto" value={formatBRL(d.financeiro.faturamentoBruto)} change={8.3} delay={0} />
            <KPICard title="Fat. Líquido" value={formatBRL(d.financeiro.faturamentoLiquido)} change={7.1} delay={1} />
            <KPICard title="Comissões Pagas" value={formatBRL(d.financeiro.comissoesPagas)} delay={2} />
            <KPICard title="Comissões Pend." value={formatBRL(d.financeiro.comissoesPendentes)} delay={3} />
            <KPICard title="CAC" value={formatBRL(d.financeiro.cac)} change={-5.2} delay={4} />
            <KPICard title="LTV" value={formatBRL(d.financeiro.ltv)} change={3.8} delay={5} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <KPICard title="Folha Mês" value={formatBRL(d.financeiro.totalFolhaMes)} change={3.2} subtitle={`Custo médio/colab: ${formatBRL(d.financeiro.custoMedioColab)}`} />
          </div>

          <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
            <h3 className="text-sm text-white/60 mb-4">Folha de Pagamento</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/40 border-b border-[#27272a]">
                    <th className="text-left py-2 px-3">Data</th>
                    <th className="text-left py-2 px-3">Competência</th>
                    <th className="text-right py-2 px-3">Bruto</th>
                    <th className="text-right py-2 px-3">Descontos</th>
                    <th className="text-right py-2 px-3">Líquido</th>
                    <th className="text-right py-2 px-3">Colabs</th>
                    <th className="text-left py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {d.financeiro.folha.map((f, i) => (
                    <tr key={i} className="border-b border-[#27272a]/50 text-white/80">
                      <td className="py-2.5 px-3">{f.data}</td>
                      <td className="py-2.5 px-3">{f.competencia}</td>
                      <td className="text-right py-2.5 px-3">{formatBRL(f.bruto)}</td>
                      <td className="text-right py-2.5 px-3 text-red-400">{formatBRL(f.descontos)}</td>
                      <td className="text-right py-2.5 px-3 font-medium">{formatBRL(f.liquido)}</td>
                      <td className="text-right py-2.5 px-3">{f.colaboradores}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">{f.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === 'Operacional' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <KPICard title="Sinistros Abertos" value={`${d.operacional.sinistrosAbertos}`} delay={0} />
            <KPICard title="Resolvidos" value={`${d.operacional.sinistrosResolvidos}`} change={12} delay={1} />
            <KPICard title="Tempo Resolução" value={`${d.operacional.tempoResolucao} dias`} change={-8} delay={2} />
            <KPICard title="Acion. 24h" value={`${d.operacional.acionamentos24h}`} delay={3} />
            <KPICard title="NPS" value={`${d.operacional.nps}`} change={0.3} delay={4} />
            <KPICard title="Rastreadores" value={formatNumber(d.operacional.rastreadores)} delay={5} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <PieChartCard
              title="Status Sinistros"
              data={d.operacional.sinistrosStatus}
              valueFormatter={formatNumber}
            />
            <BarChartCard
              title="Sinistros por Status"
              data={d.operacional.sinistrosStatus.map(s => ({ name: s.name, value: s.value, color: s.color }))}
              valueFormatter={formatNumber}
            />
          </div>
        </>
      )}
    </div>
  )
}
