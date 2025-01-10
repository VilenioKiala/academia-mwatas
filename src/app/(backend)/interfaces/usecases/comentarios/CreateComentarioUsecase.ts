import { IComentario } from "../../objects/IComentario";

type CreateComentarioParams = {
  texto: string;
  userId: string;
  videoAulaId: string;
};

interface CreateComentarioUsecase {
  create(params: CreateComentarioParams): Promise<IComentario>;
}

export type { CreateComentarioUsecase, CreateComentarioParams };
