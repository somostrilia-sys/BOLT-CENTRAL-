export const EMPRESAS = [
  { id: 'objetivo', nome: 'Objetivo', cor: '#6366f1', icone: 'Shield' },
  { id: 'trilho-solucoes', nome: 'Trilho Soluções', cor: '#0ea5e9', icone: 'Truck' },
  { id: 'trackit', nome: 'TrackIt', cor: '#10b981', icone: 'Radio' },
  { id: 'trilia', nome: 'Trilia', cor: '#f59e0b', icone: 'GraduationCap' },
  { id: 'essencia-marketing', nome: 'Essência Marketing', cor: '#ec4899', icone: 'Megaphone' },
  { id: 'digital-lux', nome: 'Digital LUX', cor: '#8b5cf6', icone: 'Cpu' },
  { id: 'oficina', nome: 'Oficina', cor: '#64748b', icone: 'Wrench' },
  { id: 'walk-contabil', nome: 'Walk Contábil', cor: '#14b8a6', icone: 'Calculator' },
] as const

export type EmpresaId = (typeof EMPRESAS)[number]['id']
