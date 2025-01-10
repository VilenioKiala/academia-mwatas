import { IRespostaComentario } from "../../objects/IRespostaComentario";

interface GetAllRespostasComentarioUsecase {
  get(): Promise<IRespostaComentario[]>;
}

export type { GetAllRespostasComentarioUsecase };
