import { IsNotEmpty, MinDate } from "class-validator";
import { IsUserIdExist } from "../helpers/errors/IsUserIdExist";
import { IUser } from "../interfaces/objects/IUser";
import { IMatricula } from "../interfaces/objects/IMatricula";
import { IsCursoIdExist } from "../helpers/errors/IsCursoIdExist";
import { ICurso } from "../interfaces/objects/ICurso";

class Matricula implements IMatricula {
  id?: string;

  @MinDate(new Date(Date.now()))
  dataExpiracao: Date;

  @IsUserIdExist()
  @IsNotEmpty()
  userId: string;

  usuario?: IUser;

  @IsCursoIdExist()
  @IsNotEmpty()
  cursoId: string;

  curso?: ICurso;

  createdAt?: Date;

  updatedAt?: Date;

  assign(params: {
    id?: string;
    userId?: string;
    cursoId?: string;
    dataExpiracao?: Date;
  }) {
    Object.assign(this, { ...params });
  }
}

export { Matricula };
