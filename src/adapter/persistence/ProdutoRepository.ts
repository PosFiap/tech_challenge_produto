import { IProdutoRepository } from "../../modules/produto/ports/IProdutoRepository";
import { PrismaClient } from "@prisma/client";
import { IProdutoEntity, IProdutoEntity2 } from "../../modules/produto/entity/IProdutoEntity";
import { CustomError, CustomErrorType } from "../../utils/customError";
import { ECategoria } from "../../modules/common/value-objects/ECategoria";

export class PrismaProdutoRepository implements IProdutoRepository {
    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    async deletaProduto(codigo: string): Promise<IProdutoEntity> {
        const existeProduto = !!(await this.prisma.produto.findUnique({
            where: {
                id: codigo
            }
        }));
        
        if(!existeProduto) throw new CustomError(
            CustomErrorType.RepositoryDataNotFound,
            "Produto não encontrado"
        )

        let produtoDeletado;
        try{
            produtoDeletado = await this.prisma.produto.delete({
                where: {id: codigo!}
            })
        } catch (err) {
            //@ts-ignore
            if(err.code && err.code === "P2003")
                throw new CustomError(
                    CustomErrorType.EntityForeignKey,
                    "Produto já vinculado a pedidos, impossível excluir"
                );
            throw err;
        }

        return produtoDeletado;
    }
    
    async buscaProdutoPorCodigo(codigo: string): Promise<IProdutoEntity> {
        const produto = await this.prisma.produto.findUnique({
            where: {
                id: codigo
            }
        });
        
        if(!produto) throw new CustomError(
            CustomErrorType.RepositoryDataNotFound,
            "Produto não encontrado"
        )

        return {
            categoria_codigo: produto.categoria_codigo,
            descricao: produto.descricao,
            nome: produto.nome,
            valor: produto.valor,
            id: produto.id
        }
    }

    async alteraProduto(produto: IProdutoEntity): Promise<IProdutoEntity> {
        
        const existeProduto = !!(await this.prisma.produto.findUnique({
            where: {
                id: produto.id
            }
        }));
        
        if(!existeProduto) throw new CustomError(
            CustomErrorType.RepositoryDataNotFound,
            "O produto não existe"
        );

        const produtoAtualizado = await this.prisma.produto.update({
            data: {
                nome: produto.nome,
                descricao: produto.descricao,
                valor: produto.valor,
                categoria_codigo: produto.categoria_codigo
            },
            where: {
                id : produto.id
            }
        })
        
        return produtoAtualizado;

    }

    buscaProdutoPorCategoria(categoriaCodigo: ECategoria): Promise<IProdutoEntity2[]> {
        const produtos = this.prisma.produto.findMany({
            where: {
                categoria_codigo: categoriaCodigo
            }
        });
        
        return produtos;
    }

    async registraProduto(produto: IProdutoEntity): Promise<IProdutoEntity> {

        const produtoJaExiste = (await this.prisma.produto.count({
            where: {
                nome: produto.nome
            }
        })) > 0;

        if(produtoJaExiste) throw new CustomError(
            CustomErrorType.DuplicatedItem,
            "Um produto cadastrado com esse nome já existe"
        );
        
        const produtoInserido = await this.prisma.produto.create({
            data: produto
        });

        return produtoInserido;
    }
}