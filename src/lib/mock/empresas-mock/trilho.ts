export const TRILHO_MOCK = {
  kpis: {
    faturamento: 480000,
    veiculosMonitorados: 8450,
    chamados24h: 34,
    tma: '12 min',
    tempoReboque: '45 min',
    resolucao1Contato: 78,
    custoAcionamento: 185,
    novasAssociacoes: 89,
    emImplantacao: 23,
    receitaRecorrenteAssoc: 156,
  },

  /* Chamados por hora (24h) — determinístico */
  chamadosHora: Array.from({ length: 24 }, (_, i) => ({
    name: `${String(i).padStart(2, '0')}h`,
    value: [2, 1, 1, 1, 2, 3, 7, 9, 8, 7, 6, 8, 9, 8, 7, 8, 9, 10, 9, 8, 7, 6, 4, 3][i],
  })),

  /* Tipo de chamado (pie) */
  tipoChamado: [
    { name: 'Roubo', value: 15, color: '#ef4444' },
    { name: 'Pane', value: 35, color: '#f59e0b' },
    { name: 'Acidente', value: 25, color: '#6366f1' },
    { name: 'Outros', value: 25, color: '#a1a1aa' },
  ],

  /* TMA 30 dias — determinístico */
  tma30d: Array.from({ length: 30 }, (_, i) => ({
    mes: `D${i + 1}`,
    valor: [13, 12, 14, 11, 13, 12, 10, 13, 14, 12, 11, 13, 12, 14, 13, 11, 12, 13, 14, 12, 11, 13, 12, 14, 13, 11, 10, 12, 13, 12][i],
  })),

  /* Pipeline funil comercial */
  pipelineFunil: [
    { name: 'Prospecção', value: 120, color: '#6366f1' },
    { name: 'Qualificação', value: 78, color: '#818cf8' },
    { name: 'Proposta', value: 45, color: '#a78bfa' },
    { name: 'Negociação', value: 28, color: '#c4b5fd' },
    { name: 'Fechamento', value: 12, color: '#10b981' },
  ],

  /* Faturamento 12 meses */
  faturamento12m: [
    { mes: 'Abr', valor: 380000 },
    { mes: 'Mai', valor: 395000 },
    { mes: 'Jun', valor: 410000 },
    { mes: 'Jul', valor: 400000 },
    { mes: 'Ago', valor: 420000 },
    { mes: 'Set', valor: 435000 },
    { mes: 'Out', valor: 440000 },
    { mes: 'Nov', valor: 455000 },
    { mes: 'Dez', valor: 470000 },
    { mes: 'Jan', valor: 460000 },
    { mes: 'Fev', valor: 475000 },
    { mes: 'Mar', valor: 480000 },
  ],
}
