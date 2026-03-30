const MESES = ['Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez','Jan','Fev','Mar']

export const DIGITAL_LUX_MOCK = {
  kpis: {
    projetosAtivos: 8,
    uptime: 99.7,
    custoInfra: 34000,
    automacoesAtivas: 23,
    economiaGerada: 89000,
    deploysPerMes: 42,
    ticketsBacklog: 15,
  },

  /* Custo infra breakdown (pie) */
  custoInfraPie: [
    { name: 'APIs', value: 11900, color: '#6366f1' },
    { name: 'Servidores', value: 8500, color: '#8b5cf6' },
    { name: 'Tokens LLM', value: 6800, color: '#a78bfa' },
    { name: 'Ferramentas', value: 6800, color: '#c4b5fd' },
  ],

  /* Deploys + Backlog 12m */
  deploysBacklog12m: MESES.map((mes, i) => ({
    dia: mes,
    deploys: [28, 32, 35, 30, 38, 36, 40, 44, 39, 41, 45, 42][i],
    backlog: [22, 20, 18, 21, 17, 19, 16, 14, 18, 16, 13, 15][i],
  })),

  /* Economia gerada 12m */
  economiaGerada12m: MESES.map((mes, i) => ({
    mes,
    economia: [52000, 55000, 58000, 60000, 64000, 68000, 71000, 74000, 78000, 82000, 85000, 89000][i],
  })),

  /* Backlog tickets */
  backlogRows: [
    { ticket: 'DLX-412', projeto: 'Walk Contábil', prioridade: 'Alta', status: 'Em progresso', responsavel: 'Lucas M.' },
    { ticket: 'DLX-408', projeto: 'InibDor Bot', prioridade: 'Crítica', status: 'Bloqueado', responsavel: 'Ana P.' },
    { ticket: 'DLX-405', projeto: 'Portal Oficina', prioridade: 'Média', status: 'Pendente', responsavel: 'Rafael S.' },
    { ticket: 'DLX-401', projeto: 'Objetivo Seg.', prioridade: 'Baixa', status: 'Pendente', responsavel: 'Carla D.' },
    { ticket: 'DLX-398', projeto: 'Walk Panel', prioridade: 'Alta', status: 'Em progresso', responsavel: 'Lucas M.' },
  ],

  /* Projetos */
  projetosRows: [
    { nome: 'Walk Holding Panel', cliente: 'Walk Holding', fase: 'Produção', conclusao: 92, receita: 18000 },
    { nome: 'InibDor Chatbot', cliente: 'InibDor', fase: 'Desenvolvimento', conclusao: 65, receita: 24000 },
    { nome: 'Portal Oficina', cliente: 'Oficina Walk', fase: 'MVP', conclusao: 40, receita: 12000 },
    { nome: 'Sistema Contábil', cliente: 'Walk Contábil', fase: 'Planejamento', conclusao: 15, receita: 8000 },
    { nome: 'App Objetivo', cliente: 'Objetivo Seg.', fase: 'Manutenção', conclusao: 100, receita: 6000 },
  ],
}
