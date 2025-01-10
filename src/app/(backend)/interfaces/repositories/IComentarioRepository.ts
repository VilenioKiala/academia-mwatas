import { IComentario } from "../objects/IComentario";

interface IComentarioRepository {
  getAll(filter?: {
    userId?: string;
    lido?: boolean;
    reprovado?: boolean;
  }): Promise<IComentario[]>;
  getOne(id: string): Promise<IComentario | null>;
  create(comentario: IComentario): Promise<IComentario>;
  update(
    comentario: IComentario,
    comentarioId: string,
    videoaulaId?: string
  ): Promise<IComentario>;
  delete(id: string): Promise<IComentario>;
}

export type { IComentarioRepository };
