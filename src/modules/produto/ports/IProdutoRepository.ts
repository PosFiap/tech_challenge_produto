import { ECategoria } from '../../common/value-objects/ECategoria'
import { IProdutoEntity } from '../entity/IProdutoEntity'

export interface IProdutoRepository {
    deletaProduto(codigo: string): Promise<IProdutoEntity>
    buscaProdutoPorCategoria(categoriaCodigo: ECategoria): Promise<IProdutoEntity[]>
    buscaProdutoPorCodigo(codigo: string): Promise<IProdutoEntity>
    registraProduto(produto: IProdutoEntity): Promise<IProdutoEntity>
    alteraProduto(produto: IProdutoEntity): Promise<IProdutoEntity>

}
