import { IComentario } from "./IComentario";
import { IUser } from "./IUser";

interface IRespostaComentario {
  id?: string;
  texto: string;
  userId: string;
  comentarioId: string;
  comentario: IComentario;
  createdAt?: Date;
  updatedAt?: Date;
  usuario?: IUser;

  create(params: {
    id?: string;
    texto?: string;
    userId?: string;
    comentarioId?: string;
  }): void;
}

export type { IRespostaComentario };
