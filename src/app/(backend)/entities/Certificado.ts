import { IsNotEmpty, Length } from "class-validator";
import { IsUserIdExist } from "../helpers/errors/IsUserIdExist";
import { IUser } from "../interfaces/objects/IUser";
import { ICertificado } from "../interfaces/objects/ICertificado";
import { IsCursoIdExist } from "../helpers/errors/IsCursoIdExist";
import { ICurso } from "../interfaces/objects/ICurso";

class Certificado implements ICertificado {
  id?: string;

  imagem: string;

  @Length(0, 500)
  texto?: string;

  @IsCursoIdExist()
  @IsNotEmpty()
  cursoId: string;

  curso: ICurso;

  @IsUserIdExist()
  @IsNotEmpty()
  userId: string;

  usuario: IUser;

  createdAt?: Date;

  updatedAt?: Date;

  create(params: {
    id?: string;
    texto?: string;
    cursoId?: string;
    userId?: string;
  }) {
    Object.assign(this, { ...params });
  }
}

export { Certificado };
