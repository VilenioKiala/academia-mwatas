import { IsNotEmpty, Length } from "class-validator";
import { IComentario } from "../interfaces/objects/IComentario";
import { IsVideoaulaIdExist } from "../helpers/errors/IsVideoaulaIdExist";
import { IsUserIdExist } from "../helpers/errors/IsUserIdExist";
import { IRespostaComentario } from "../interfaces/objects/IRespostaComentario";
import { IUser } from "../interfaces/objects/IUser";
import { IVideoAula } from "../interfaces/objects/IVideoAula";

class Comentario implements IComentario {
  id?: string;

  @Length(1, 500)
  @IsNotEmpty()
  texto: string;

  respostas?: IRespostaComentario[];

  @IsUserIdExist()
  @IsNotEmpty()
  userId: string;

  usuario: IUser;

  videoAula: IVideoAula;

  reprovado: boolean;

  lido: boolean;

  @IsVideoaulaIdExist()
  @IsNotEmpty()
  videoAulaId: string;

  createdAt?: Date;

  updatedAt?: Date;

  assign(params: {
    id?: string;
    texto?: string;
    userId?: string;
    videoAulaId?: string;
  }) {
    Object.assign(this, { ...params });
  }
}

export { Comentario };
