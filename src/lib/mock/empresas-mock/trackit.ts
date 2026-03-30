export const TRACKIT_MOCK = {
  kpis: {
    rastreadores: 4200,
    estoque: 340,
    instaladosMes: 187,
    uptime: 99.2,
    alertasDisparados: 456,
    chipsM2M: 3890,
    receitaSaaS: 320000,
  },

  /* Receita por cliente */
  receitaClientes: [
    { cliente: 'Transportes ABC', plano: 'Enterprise', dispositivos: 820, receita: 73800 },
    { cliente: 'Logística Norte', plano: 'Business', dispositivos: 540, receita: 43200 },
    { cliente: 'Frota Express', plano: 'Business', dispositivos: 380, receita: 30400 },
    { cliente: 'Agro Tracking', plano: 'Starter', dispositivos: 290, receita: 20300 },
    { cliente: 'Minas Cargas', plano: 'Enterprise', dispositivos: 650, receita: 58500 },
  ],

  /* Instalados vs Estoque 12m */
  instaladosEstoque12m: [
    { dia: 'Abr', instalados: 150, estoque: 400 },
    { dia: 'Mai', instalados: 165, estoque: 380 },
    { dia: 'Jun', instalados: 142, estoque: 360 },
    { dia: 'Jul', instalados: 178, estoque: 330 },
    { dia: 'Ago', instalados: 190, estoque: 310 },
    { dia: 'Set', instalados: 160, estoque: 350 },
    { dia: 'Out', instalados: 175, estoque: 340 },
    { dia: 'Nov', instalados: 185, estoque: 320 },
    { dia: 'Dez', instalados: 195, estoque: 300 },
    { dia: 'Jan', instalados: 170, estoque: 360 },
    { dia: 'Fev', instalados: 180, estoque: 350 },
    { dia: 'Mar', instalados: 187, estoque: 340 },
  ],

  /* Alertas por tipo (pie) */
  alertasTipo: [
    { name: 'Roubo', value: 30, color: '#ef4444' },
    { name: 'Cerca', value: 25, color: '#f59e0b' },
    { name: 'Velocidade', value: 20, color: '#6366f1' },
    { name: 'Desconexão', value: 15, color: '#8b5cf6' },
    { name: 'Outros', value: 10, color: '#a1a1aa' },
  ],

  /* Receita SaaS 12m */
  receitaSaas12m: [
    { mes: 'Abr', valor: 245000 },
    { mes: 'Mai', valor: 252000 },
    { mes: 'Jun', valor: 260000 },
    { mes: 'Jul', valor: 268000 },
    { mes: 'Ago', valor: 275000 },
    { mes: 'Set', valor: 282000 },
    { mes: 'Out', valor: 290000 },
    { mes: 'Nov', valor: 298000 },
    { mes: 'Dez', valor: 305000 },
    { mes: 'Jan', valor: 310000 },
    { mes: 'Fev', valor: 315000 },
    { mes: 'Mar', valor: 320000 },
  ],

  /* Pedidos China */
  pedidosChina: [
    { data: '15/01/2026', quantidade: 2000, custoUnit: 42, custoTotal: 84000, precoVenda: 89, margem: 52.8 },
    { data: '28/02/2026', quantidade: 1500, custoUnit: 40, custoTotal: 60000, precoVenda: 89, margem: 55.1 },
    { data: '10/03/2026', quantidade: 3000, custoUnit: 38, custoTotal: 114000, precoVenda: 85, margem: 55.3 },
  ],
}
