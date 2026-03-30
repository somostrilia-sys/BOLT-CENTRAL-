const MESES = ['Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez','Jan','Fev','Mar']

export const OFICINA_MOCK = {
  kpis: {
    vistoriasMes: 145,
    reparosAndamento: 12,
    tempoVistoria: '2,5h',
    tempoReparo: '4,8 dias',
    custoMedio: 1200,
    receita: 78000,
    pecasEstoque: 45000,
  },

  /* Vistorias vs Reparos 12m */
  vistoriasReparos12m: MESES.map((mes, i) => ({
    dia: mes,
    vistorias: [110, 115, 120, 125, 128, 132, 135, 138, 140, 142, 143, 145][i],
    reparos: [8, 9, 7, 10, 11, 9, 12, 10, 11, 13, 11, 12][i],
  })),

  /* Tipo de serviço (pie) */
  tipoServicoPie: [
    { name: 'Vistoria', value: 45, color: '#6366f1' },
    { name: 'Funilaria', value: 25, color: '#8b5cf6' },
    { name: 'Mecânica', value: 20, color: '#a78bfa' },
    { name: 'Elétrica', value: 10, color: '#c4b5fd' },
  ],

  /* Tempo médio 12m */
  tempoMedio12m: MESES.map((mes, i) => ({
    mes,
    tempo: [3.2, 3.0, 2.9, 2.8, 2.7, 2.8, 2.6, 2.7, 2.5, 2.6, 2.5, 2.5][i],
  })),

  /* Serviços em andamento */
  servicosRows: [
    { placa: 'ABC-1D23', tipo: 'Vistoria', entrada: '14/03/2026', previsao: '14/03/2026', status: 'Concluido', valor: 350 },
    { placa: 'DEF-4E56', tipo: 'Funilaria', entrada: '10/03/2026', previsao: '18/03/2026', status: 'Em andamento', valor: 2800 },
    { placa: 'GHI-7F89', tipo: 'Mecânica', entrada: '08/03/2026', previsao: '20/03/2026', status: 'Em andamento', valor: 1950 },
    { placa: 'JKL-0G12', tipo: 'Elétrica', entrada: '12/03/2026', previsao: '15/03/2026', status: 'Atrasado', valor: 780 },
    { placa: 'MNO-3H45', tipo: 'Vistoria', entrada: '15/03/2026', previsao: '15/03/2026', status: 'Aguardando', valor: 350 },
  ],
}
