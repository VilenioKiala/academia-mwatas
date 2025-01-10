import { IsNotEmpty, Length } from "class-validator";
import { IVideoAula } from "../interfaces/objects/IVideoAula";
import { ICurso } from "../interfaces/objects/ICurso";
import { IModulo } from "../interfaces/objects/IModule";
import { IsCursoIdExist } from "../helpers/errors/IsCursoIdExist";

class Modulo implements IModulo {
  id?: string;

  @Length(1, 30)
  @IsNotEmpty()
  titulo: string;

  curso: ICurso;

  videoaulas?: IVideoAula[];

  @IsCursoIdExist()
  @IsNotEmpty()
  cursoId: string;

  create(params: { id?: string; titulo: string; cursoId: string }) {
    Object.assign(this, { ...params });
  }
}

export { Modulo };
