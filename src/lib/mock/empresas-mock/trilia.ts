export const TRILIA_MOCK = {
  kpis: {
    leadsFunil: 340,
    callsAgendadas: 89,
    callsRealizadas: 72,
    contratosFechados: 18,
    ticketMedio: 4500,
    receita: 210000,
    clientesAtivos: 45,
    nps: 9.1,
  },

  /* Funil SDR → Closer → Fechamento */
  funilVendas: [
    { name: 'Leads', value: 340, color: '#6366f1' },
    { name: 'SDR Qualificado', value: 180, color: '#818cf8' },
    { name: 'Calls Agendadas', value: 89, color: '#a78bfa' },
    { name: 'Calls Realizadas', value: 72, color: '#c4b5fd' },
    { name: 'Propostas', value: 35, color: '#ddd6fe' },
    { name: 'Contratos Fechados', value: 18, color: '#10b981' },
  ],

  /* Receita Recorrente vs Pontual 12m */
  receita12m: [
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
  ],

  /* NPS 12m */
  nps12m: [
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
  ],

  /* Pipeline Eventos */
  pipelineEventos: [
    { evento: 'Conferência Tech SP', data: '15/04/2026', local: 'São Paulo', status: 'Confirmado', receita: 45000 },
    { evento: 'Workshop Logística', data: '22/04/2026', local: 'Curitiba', status: 'Em negociação', receita: 28000 },
    { evento: 'Feira Agro 2026', data: '10/05/2026', local: 'Goiânia', status: 'Proposta enviada', receita: 62000 },
    { evento: 'Summit Seguros', data: '28/05/2026', local: 'Rio de Janeiro', status: 'Confirmado', receita: 38000 },
    { evento: 'Hackathon IoT', data: '15/06/2026', local: 'Belo Horizonte', status: 'Lead', receita: 15000 },
  ],

  /* Conteúdos por cliente */
  conteudosCliente: [
    { cliente: 'Trilho Soluções', posts: 24, videos: 8, emails: 12, engajamento: '4.2%' },
    { cliente: 'TrackIt', posts: 18, videos: 6, emails: 10, engajamento: '3.8%' },
    { cliente: 'Objetivo Seguros', posts: 20, videos: 4, emails: 15, engajamento: '5.1%' },
    { cliente: 'InibDor', posts: 30, videos: 12, emails: 20, engajamento: '6.3%' },
    { cliente: 'Walk Holding', posts: 12, videos: 3, emails: 8, engajamento: '3.5%' },
  ],
}
