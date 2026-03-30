'use client'

import { Cpu, Package, Wrench, Activity, Bell, Wifi, DollarSign } from 'lucide-react'
import KPICard from '@/components/dashboard/KPICard'
import PieChartCard from '@/components/charts/PieChartCard'
import AreaChartCard from '@/components/charts/AreaChartCard'
import ComposedChartCard from '@/components/charts/ComposedChartCard'
import { formatBRL, formatNumber } from '@/lib/utils/formatters'
import { TRACKIT_MOCK } from '@/lib/mock/empresas-mock/trackit'

const { kpis, receitaClientes, instaladosEstoque12m, alertasTipo, receitaSaas12m, pedidosChina } = TRACKIT_MOCK

export default function TrackItPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">TrackIt</h1>
        <p className="text-white/40 text-sm">Rastreamento veicular &amp; IoT</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <KPICard title="Rastreadores Ativos" value={formatNumber(kpis.rastreadores)} change={2.8} icon={<Cpu size={16} />} delay={0} />
        <KPICard title="Estoque" value={formatNumber(kpis.estoque)} icon={<Package size={16} />} delay={1} />
        <KPICard title="Instalados Mês" value={String(kpis.instaladosMes)} change={3.9} icon={<Wrench size={16} />} delay={2} />
        <KPICard title="Uptime" value={`${kpis.uptime.toFixed(1).replace('.', ',')}%`} progress={Math.round(kpis.uptime)} progressColor="#10b981" icon={<Activity size={16} />} delay={3} />
        <KPICard title="Alertas Disparados" value={formatNumber(kpis.alertasDisparados)} change={-8.2} icon={<Bell size={16} />} delay={4} />
        <KPICard title="Chips M2M Ativos" value={formatNumber(kpis.chipsM2M)} icon={<Wifi size={16} />} delay={5} />
        <KPICard title="Receita SaaS" value={formatBRL(kpis.receitaSaaS)} change={4.5} icon={<DollarSign size={16} />} delay={6} />
      </div>

      {/* Receita por Cliente */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
        <h3 className="text-sm text-white/60 mb-4">Receita por Cliente</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#27272a] text-white/40 text-xs uppercase">
                <th className="text-left py-2 px-3">Cliente</th>
                <th className="text-left py-2 px-3">Plano</th>
                <th className="text-right py-2 px-3">Dispositivos</th>
                <th className="text-right py-2 px-3">Receita Mensal</th>
              </tr>
            </thead>
            <tbody>
              {receitaClientes.map((r, i) => (
                <tr key={i} className="border-b border-[#27272a]/50 hover:bg-white/[0.02] transition-colors">
                  <td className="py-2 px-3 text-white">{r.cliente}</td>
                  <td className="py-2 px-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      r.plano === 'Enterprise' ? 'bg-indigo-500/20 text-indigo-400' :
                      r.plano === 'Business' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-white/10 text-white/60'
                    }`}>{r.plano}</span>
                  </td>
                  <td className="py-2 px-3 text-right text-white/80">{formatNumber(r.dispositivos)}</td>
                  <td className="py-2 px-3 text-right text-emerald-400 font-medium">{formatBRL(r.receita)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ComposedChartCard
          title="Instalados vs Estoque \u2014 12 Meses"
          data={instaladosEstoque12m}
          bars={[
            { key: 'instalados', color: '#6366f1', name: 'Instalados' },
          ]}
          lines={[
            { key: 'estoque', color: '#f59e0b', name: 'Estoque' },
          ]}
          valueFormatter={(v) => String(v)}
        />
        <PieChartCard
          title="Alertas por Tipo"
          data={alertasTipo}
          valueFormatter={(v) => `${v}%`}
        />
        <AreaChartCard
          title="Receita SaaS \u2014 12 Meses"
          data={receitaSaas12m}
          dataKey="valor"
          color="#10b981"
        />
      </div>

      {/* Importa\u00e7\u00e3o */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
        <h3 className="text-sm text-white/60 mb-1">Importa\u00e7\u00e3o</h3>
        <p className="text-white/30 text-xs mb-4">Pedidos China</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#27272a] text-white/40 text-xs uppercase">
                <th className="text-left py-2 px-3">Data Pedido</th>
                <th className="text-right py-2 px-3">Quantidade</th>
                <th className="text-right py-2 px-3">Custo Unit.</th>
                <th className="text-right py-2 px-3">Custo Total</th>
                <th className="text-right py-2 px-3">Pre\u00e7o Venda</th>
                <th className="text-right py-2 px-3">Margem %</th>
              </tr>
            </thead>
            <tbody>
              {pedidosChina.map((p, i) => (
                <tr key={i} className="border-b border-[#27272a]/50 hover:bg-white/[0.02] transition-colors">
                  <td className="py-2 px-3 text-white">{p.data}</td>
                  <td className="py-2 px-3 text-right text-white/80">{formatNumber(p.quantidade)}</td>
                  <td className="py-2 px-3 text-right text-white/80">{formatBRL(p.custoUnit)}</td>
                  <td className="py-2 px-3 text-right text-white/80">{formatBRL(p.custoTotal)}</td>
                  <td className="py-2 px-3 text-right text-white/80">{formatBRL(p.precoVenda)}</td>
                  <td className="py-2 px-3 text-right">
                    <span className={`font-medium ${p.margem >= 50 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {p.margem.toFixed(1)}%
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
