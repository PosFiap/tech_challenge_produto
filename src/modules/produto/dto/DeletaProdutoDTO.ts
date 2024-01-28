import { CustomError, CustomErrorType } from "../../../utils/customError";
import { ECategoria } from "../../common/value-objects/ECategoria";

export class DeletaProdutoDTO {
    constructor(
        readonly codigo: string,
    ){
        this.validaCodigo();
    }

    private validaCodigo() {
        if(!this.codigo) throw new CustomError(CustomErrorType.InvalidInput, "Código inválido");
    }
}

export class DeletaProdutoOutputDTO {
    constructor(
        readonly codigo: number,
        readonly id: string,
        readonly nome: string,
        readonly descricao: string,
        readonly valor: number,
        readonly categoriaCodigo: ECategoria,
   ){}

   toJSON() {
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