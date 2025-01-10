import { IRespostaComentario } from "../../objects/IRespostaComentario";

type CreateRespostaComentarioParams = {
  texto: string;
  userId: string;
  comentarioId: string;
};

interface CreateRespostaComentarioUsecase {
  create(params: CreateRespostaComentarioParams): Promise<IRespostaComentario>;
}

export type { CreateRespostaComentarioUsecase, CreateRespostaComentarioParams };
