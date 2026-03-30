const MESES = ['Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez','Jan','Fev','Mar']

export const WALK_CONTABIL_MOCK = {
  kpis: {
    empresasAtendidas: 8,
    obrigacoesPendentes: 5,
    guiasEmitidas: 234,
    folhasProcessadas: 8,
    receita: 42000,
  },

  /* Cumpridas vs Pendentes 12m */
  cumpridasPendentes12m: MESES.map((mes, i) => ({
    dia: mes,
    cumpridas: [28, 30, 32, 29, 31, 33, 30, 34, 32, 35, 33, 30][i],
    pendentes: [4, 3, 2, 5, 3, 2, 4, 1, 3, 2, 3, 5][i],
  })),

  /* Status certidões por empresa */
  empresas: [
    { nome: 'Walk Holding',   cndFederal: 'green',  cndEstadual: 'green',  cndMunicipal: 'green',  fgts: 'green' },
    { nome: 'Objetivo Seg.',  cndFederal: 'green',  cndEstadual: 'green',  cndMunicipal: 'yellow', fgts: 'green' },
    { nome: 'Oficina Walk',   cndFederal: 'green',  cndEstadual: 'green',  cndMunicipal: 'green',  fgts: 'green' },
    { nome: 'Digital LUX',    cndFederal: 'green',  cndEstadual: 'green',  cndMunicipal: 'green',  fgts: 'green' },
    { nome: 'InibDor SP',     cndFederal: 'green',  cndEstadual: 'yellow', cndMunicipal: 'green',  fgts: 'green' },
    { nome: 'InibDor RJ',     cndFederal: 'red',    cndEstadual: 'green',  cndMunicipal: 'green',  fgts: 'green' },
    { nome: 'Walk Imóveis',   cndFederal: 'green',  cndEstadual: 'green',  cndMunicipal: 'green',  fgts: 'green' },
    { nome: 'Walk Contábil',  cndFederal: 'green',  cndEstadual: 'green',  cndMunicipal: 'green',  fgts: 'green' },
  ],

  /* Obrigações fiscais */
  obrigacoesRows: [
    { obrigacao: 'DCTF Mensal', empresa: 'Walk Holding', deadline: '15/03/2026', status: 'Vencido', responsavel: 'Maria S.' },
    { obrigacao: 'EFD-Contribuições', empresa: 'InibDor RJ', deadline: '20/03/2026', status: 'Pendente', responsavel: 'Carlos R.' },
    { obrigacao: 'GFIP/SEFIP', empresa: 'Objetivo Seg.', deadline: '07/04/2026', status: 'Em andamento', responsavel: 'Ana L.' },
    { obrigacao: 'ECD', empresa: 'Digital LUX', deadline: '31/05/2026', status: 'Pendente', responsavel: 'Pedro M.' },
    { obrigacao: 'DIRF', empresa: 'Oficina Walk', deadline: '28/02/2026', status: 'Vencido', responsavel: 'Maria S.' },
  ],

  /* Alertas fiscais */
  alertasFiscais: [
    { id: '1', severity: 'critical' as const, title: 'CND Federal InibDor RJ irregular - regularizar PGFN', empresa: 'InibDor RJ' },
    { id: '2', severity: 'critical' as const, title: 'DCTF Walk Holding vencida em 15/03', empresa: 'Walk Holding' },
    { id: '3', severity: 'warning' as const, title: 'CND Municipal Objetivo com pendência - verificar ISS', empresa: 'Objetivo Seg.' },
    { id: '4', severity: 'warning' as const, title: 'CND Estadual InibDor SP próxima do vencimento', empresa: 'InibDor SP' },
    { id: '5', severity: 'info' as const, title: 'EFD-Contribuições InibDor RJ vence em 20/03', empresa: 'InibDor RJ' },
    { id: '6', severity: 'info' as const, title: 'Novo prazo ECD prorrogado para 30/06', empresa: 'Todas' },
  ],
}
