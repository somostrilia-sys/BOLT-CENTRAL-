export const ESSENCIA_MOCK = {
  kpis: {
    clientesAtivos: 12,
    investimentoTrafego: 89000,
    roas: 4.2,
    cpl: 28,
    conteudosMes: 156,
    receita: 185000,
    totalDespesas: 127000,
    margemOperacional: 31,
  },

  /* Performance por cliente */
  perfClientes: [
    { cliente: 'InibDor', investimento: 25000, leads: 680, cpl: 36.76, roas: 5.1, engajamento: 7.2 },
    { cliente: 'Trilho Soluções', investimento: 18000, leads: 520, cpl: 34.62, roas: 4.8, engajamento: 5.8 },
    { cliente: 'TrackIt', investimento: 15000, leads: 410, cpl: 36.59, roas: 3.9, engajamento: 4.1 },
    { cliente: 'Objetivo Seguros', investimento: 20000, leads: 890, cpl: 22.47, roas: 4.5, engajamento: 6.4 },
    { cliente: 'Walk Holding', investimento: 11000, leads: 310, cpl: 35.48, roas: 3.2, engajamento: 3.9 },
  ],

  /* Receita 12m */
  receita12m: [
    { mes: 'Abr', valor: 145000 },
    { mes: 'Mai', valor: 150000 },
    { mes: 'Jun', valor: 155000 },
    { mes: 'Jul', valor: 152000 },
    { mes: 'Ago', valor: 160000 },
    { mes: 'Set', valor: 165000 },
    { mes: 'Out', valor: 168000 },
    { mes: 'Nov', valor: 172000 },
    { mes: 'Dez', valor: 178000 },
    { mes: 'Jan', valor: 175000 },
    { mes: 'Fev', valor: 180000 },
    { mes: 'Mar', valor: 185000 },
  ],

  /* Despesas */
  despesas: [
    { data: '01/03/2026', categoria: 'Tráfego Pago', descricao: 'Meta Ads — InibDor', valor: 25000, formaPgto: 'Cartão', status: 'Pago' },
    { data: '05/03/2026', categoria: 'Ferramentas', descricao: 'HubSpot + SEMrush', valor: 4800, formaPgto: 'Boleto', status: 'Pago' },
    { data: '10/03/2026', categoria: 'Equipe', descricao: 'Salários + encargos', valor: 62000, formaPgto: 'Transferência', status: 'Pago' },
    { data: '12/03/2026', categoria: 'Freelancers', descricao: 'Designer + Videomaker', valor: 18000, formaPgto: 'PIX', status: 'Pendente' },
    { data: '15/03/2026', categoria: 'Infraestrutura', descricao: 'Hosting + CDN + Domínios', valor: 3200, formaPgto: 'Cartão', status: 'Pago' },
  ],

  /* Despesas por categoria (pie) */
  despesasCategoria: [
    { name: 'Tráfego Pago', value: 45000, color: '#6366f1' },
    { name: 'Ferramentas', value: 8500, color: '#8b5cf6' },
    { name: 'Equipe', value: 62000, color: '#f59e0b' },
    { name: 'Freelancers', value: 18000, color: '#10b981' },
    { name: 'Infraestrutura', value: 3500, color: '#a1a1aa' },
  ],

  /* Despesas vs Receita 12m */
  despesasReceita12m: [
    { dia: 'Abr', despesas: 105000, receita: 145000 },
    { dia: 'Mai', despesas: 108000, receita: 150000 },
    { dia: 'Jun', despesas: 112000, receita: 155000 },
    { dia: 'Jul', despesas: 110000, receita: 152000 },
    { dia: 'Ago', despesas: 115000, receita: 160000 },
    { dia: 'Set', despesas: 118000, receita: 165000 },
    { dia: 'Out', despesas: 120000, receita: 168000 },
    { dia: 'Nov', despesas: 122000, receita: 172000 },
    { dia: 'Dez', despesas: 125000, receita: 178000 },
    { dia: 'Jan', despesas: 123000, receita: 175000 },
    { dia: 'Fev', despesas: 126000, receita: 180000 },
    { dia: 'Mar', despesas: 127000, receita: 185000 },
  ],
}
