import { CustomError, CustomErrorType } from "../../../utils/customError";
import { ECategoria } from "../../common/value-objects/ECategoria";

export class BuscarProdutoDTO {
    constructor(
        readonly codigo: string,
    ){
        this.validaCodigo();
    }

    private validaCodigo() {
        if(!this.codigo) throw new CustomError(CustomErrorType.InvalidInput, "Código inválido");
    }
}

export class BuscarProdutoOutputDTO{
    constructor(
        readonly codigo: number,
        readonly nome: string,
        readonly descricao: string,
        readonly valor: number,
        readonly categoriaCodigo: ECategoria,
   ){}

   toJSON() {
    return {
        codigo: this.codigo,
        nome: this.nome,
        descricao: this.descricao,
        valor: this.valor,
        categoria_codigo: this.categoriaCodigo,
        categoria: ECategoria[this.categoriaCodigo]
        }
    }
}