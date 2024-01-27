import { ECategoria } from '../../common/value-objects/ECategoria'

export interface IProdutoEntity {
  id?: string
  codigo?: number
  nome: string
  descricao: string
  valor: number
  categoria_codigo: ECategoria
}

export interface IProdutoEntity2 {
  id: string
  codigo?: number
  nome: string
  descricao: string
  valor: number
  categoria_codigo: ECategoria
}