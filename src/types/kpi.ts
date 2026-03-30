export interface KPIData {
  label: string
  value: number
  formattedValue: string
  change?: number
  changeLabel?: string
  progress?: number
  sparkline?: number[]
  severity?: 'success' | 'warning' | 'danger' | 'info'
}

export interface EmpresaKPIs {
  empresaId: string
  kpis: KPIData[]
  faturamento: number
  periodo: string
}
