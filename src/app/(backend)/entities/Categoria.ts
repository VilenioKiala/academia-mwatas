import { IsNotEmpty, Length } from "class-validator";
import { ICurso } from "../interfaces/objects/ICurso";
import { ICategoria } from "../interfaces/objects/ICategoria";

class Categoria implements ICategoria {
  id?: string;

  @Length(1, 80)
  @IsNotEmpty()
  titulo: string;

  cursos?: ICurso[];

  createdAt?: Date;

  updatedAt?: Date;

  assign(params: { titulo: string }) {
    Object.assign(this, { ...params });
  }
}

export { Categoria };
