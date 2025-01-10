import { IsNotEmpty, Length } from "class-validator";
import { IsUserIdExist } from "../helpers/errors/IsUserIdExist";
import { IRespostaComentario } from "../interfaces/objects/IRespostaComentario";
import { IsComentarioIdExist } from "../helpers/errors/IsComentarioIdExist";
import { IComentario } from "../interfaces/objects/IComentario";
import { IUser } from "../interfaces/objects/IUser";

class RespostaComentario implements IRespostaComentario {
  id?: string;

  comentario: IComentario;

  usuario?: IUser;

  texto: string;

  @IsUserIdExist()
  @IsNotEmpty()
  userId: string;

  @IsComentarioIdExist()
  @IsNotEmpty()
  comentarioId: string;

  createdAt?: Date;

  updatedAt?: Date;

  create(params: {
    id?: string;
    texto?: string;
    userId?: string;
    comentarioId?: string;
  }) {
    Object.assign(this, { ...params });
  }
}

export { RespostaComentario };
