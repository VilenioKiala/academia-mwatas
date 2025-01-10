import { IRespostaComentario } from "../../objects/IRespostaComentario";

interface GetRespostasFromComentarioUsecase {
  get(comentarioId: string): Promise<IRespostaComentario[]>;
}

export type { GetRespostasFromComentarioUsecase };
