export interface Empresa {
  id: string
  nome: string
  cor: string
  icone: string
}

export interface Franquia {
  id: string
  nome: string
  cidade: string
  empresaId: string
  vendas: number
  meta: number
  receita: number
  inadimplencia: number
}

export interface Consultor {
  id: string
  nome: string
  franquiaId: string
  franquiaNome: string
  placas: number
  conversao: number
  ticket: number
}
