import { CustomError, CustomErrorType } from '../../../utils/customError'
import { ECategoria } from '../../common/value-objects/ECategoria'

export class AlteraProdutoDTO {
    constructor(
        readonly id: string,
        readonly codigo: number,
        readonly nome: string,
        readonly descricao: string,
        readonly valor: number,
        readonly categoriaCodigo: ECategoria,
    ){
        this.validaCodigo();
        this.validaCodigoCategoria();
        this.validaDescricao();
        this.validaNome();
        this.validaValor();
    }

    validaCodigo() {
        if(!this.codigo || isNaN(this.codigo)) throw new CustomError(CustomErrorType.InvalidInput, "Código inválido");
    }

    validaId() {
      if(!this.id) throw new CustomError(CustomErrorType.InvalidInput, "Id inválido");
  }

    validaDescricao() {
        if(!this.descricao) throw new CustomError(CustomErrorType.InvalidInput, "Descrição inválida");
    }

  validaNome (): void {
    if (!this.nome) throw new CustomError(CustomErrorType.InvalidInput, 'Nome inválido')
  }

  validaValor (): void {
    if (this.valor == null || isNaN(this.valor)) {
      throw new CustomError(CustomErrorType.InvalidInput, 'Valor inválido')
    }
  }

  validaCodigoCategoria (): void {
    if (this.categoriaCodigo == null || isNaN(this.categoriaCodigo)) {
      throw new CustomError(CustomErrorType.InvalidInput, 'Código de categoria inválido')
    }
  }
}

export class AlteraProdutoOutputDTO {
  constructor (
    readonly id: string,
    readonly codigo: number,
    readonly nome: string,
    readonly descricao: string,
    readonly valor: number,
    readonly categoriaCodigo: ECategoria
  ) {}

  toJSON (): Record<string, any> {
    return {
      id: this.id,
      codigo: this.codigo,
      nome: this.nome,
      descricao: this.descricao,
      valor: this.valor,
      categoria_codigo: this.categoriaCodigo,
      categoria: ECategoria[this.categoriaCodigo]
    }
  }
}
