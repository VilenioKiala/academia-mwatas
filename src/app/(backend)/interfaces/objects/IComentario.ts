import { IRespostaComentario } from "./IRespostaComentario";
import { IUser } from "./IUser";
import { IVideoAula } from "./IVideoAula";

interface IComentario {
  id?: string;
  texto: string;
  respostas?: IRespostaComentario[];
  videoAulaId: string;
  userId: string;
  videoAula: IVideoAula;
  usuario: IUser;
  reprovado: boolean;
  lido: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  assign(params: {
    id?: string;
    texto?: string;
    userId?: string;
    videoAulaId?: string;
  }): void;
}

export type { IComentario };
