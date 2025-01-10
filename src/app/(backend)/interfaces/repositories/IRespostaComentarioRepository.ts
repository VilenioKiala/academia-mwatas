import { IRespostaComentario } from "../objects/IRespostaComentario";

interface IRespostaComentarioRepository {
  getAll(): Promise<IRespostaComentario[]>;
  getAllRespostasFromComentario(
    comentarioId: string
  ): Promise<IRespostaComentario[]>;
  getOne(id: string): Promise<IRespostaComentario | null>;
  create(respostaComentario: IRespostaComentario): Promise<IRespostaComentario>;
}

export type { IRespostaComentarioRepository };
