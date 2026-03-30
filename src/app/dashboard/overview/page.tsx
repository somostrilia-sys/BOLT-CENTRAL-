'use client'

import { DollarSign, Users, CreditCard, TrendingUp, AlertTriangle, Layers } from 'lucide-react'
import KPICard from '@/components/dashboard/KPICard'
import BarChartCard from '@/components/charts/BarChartCard'
import AreaChartCard from '@/components/charts/AreaChartCard'
import PieChartCard from '@/components/charts/PieChartCard'
import ComposedChartCard from '@/components/charts/ComposedChartCard'
import AlertList from '@/components/dashboard/AlertList'
import { BOLT_MOCK } from '@/lib/mock/bolt-data'
import { formatBRL, formatNumber, formatPercent } from '@/lib/utils/formatters'

export default function OverviewPage() {
  const d = BOLT_MOCK

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KPICard
          title="Faturamento" value={formatBRL(d.consolidado.faturamento)}
          change={8.3} progress={78} progressColor="#6366f1"
          icon={<DollarSign size={16} />} delay={0}
        />
        <KPICard
          title="Lucro Líquido" value={formatBRL(d.consolidado.lucroLiquido)}
          subtitle={`Margem ${d.consolidado.margemLiquida}%`}
          icon={<TrendingUp size={16} />} delay={1}
        />
        <KPICard
          title="Colaboradores" value={formatNumber(d.consolidado.colaboradores)}
          change={1.6} changeLabel="+3"
          icon={<Users size={16} />} delay={2}
        />
        <KPICard
          title="Placas Ativas" value={formatNumber(d.consolidado.placasAtivas)}
          change={1.9} changeLabel={`+${d.consolidado.placasLiquidas} líq.`}
          icon={<Layers size={16} />} delay={3}
        />
        <KPICard
          title="Cash Flow" value={formatBRL(d.consolidado.cashFlow)}
          subtitle="Projeção 30/60/90d"
          icon={<CreditCard size={16} />} delay={4}
        />
        <KPICard
          title="Inadimplência" value={`${d.consolidado.inadimplencia}%`}
          change={-0.3}
          icon={<AlertTriangle size={16} />} delay={5}
          progressColor={d.consolidado.inadimplencia > 8 ? '#ef4444' : d.consolidado.inadimplencia > 5 ? '#f59e0b' : '#10b981'}
        />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BarChartCard
          title="Faturamento por Empresa"
          data={d.faturamentoPorEmpresa.map(e => ({ name: e.empresa, value: e.valor, color: e.cor }))}
          horizontal
        />
        <AreaChartCard
          title="Evolução 12 Meses"
          data={d.evolucao12m}
          dataKey="valor"
          metaKey="meta"
        />
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <PieChartCard
          title="Distribuição Receita"
          data={d.faturamentoPorEmpresa.map(e => ({ name: e.empresa, value: e.valor, color: e.cor }))}
        />
        <ComposedChartCard
          title="Cash Flow 90 Dias"
          data={d.cashFlow90d}
          bars={[
            { key: 'entrada', color: '#10b981', name: 'Entradas' },
            { key: 'saida', color: '#ef4444', name: 'Saídas' },
          ]}
          lines={[{ key: 'saldo', color: '#6366f1', name: 'Saldo' }]}
        />
        <AlertList alerts={d.alertas} />
      </div>
    </div>
  )
}
