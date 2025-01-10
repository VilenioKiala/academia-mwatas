import { IsNotEmpty, IsNumber, Length } from "class-validator";
import { IsCategoryExist } from "../helpers/errors/IsCategoryExist";
import { IMatricula } from "../interfaces/objects/IMatricula";
import { ICurso } from "../interfaces/objects/ICurso";
import { ICategoria } from "../interfaces/objects/ICategoria";
import { IModulo } from "../interfaces/objects/IModule";

class Curso implements ICurso {
  id?: string;

  @Length(1, 100)
  @IsNotEmpty()
  titulo: string;

  sobreOCcurso?: string;

  coverCurso: string;

  fraseDestaque?: string;

  matriculas?: IMatricula[];

  modulos?: IModulo[];

  @IsNumber()
  @IsNotEmpty()
  preco: number;

  categoria: ICategoria;

  @IsCategoryExist()
  @IsNotEmpty()
  categoriaId: string;

  createdAt?: Date;

  updatedAt?: Date;

  assign(params: {
    id?: string;
    titulo?: string;
    sobreOCurso?: string;
    coverCurso?: string;
    preco?: number;
    fraseDestaque?: string;
    categoriaId?: ICategoria;
  }) {
    Object.assign(this, { ...params });
  }
}

export { Curso };
