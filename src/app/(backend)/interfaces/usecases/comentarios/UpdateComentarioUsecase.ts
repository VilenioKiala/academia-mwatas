import { IComentario } from "../../objects/IComentario";

type UpdateComentarioUsecaseParams = {
  videoaulaId?: string;
  texto?: string;
  userId?: string;
  lido?: boolean;
  reprovado?: boolean;
  preco?: number;
};

interface UpdateComentarioUsecase {
  update(
    params: UpdateComentarioUsecaseParams,
    comentarioId: string
  ): Promise<{ comentario: IComentario; updated: boolean }>;
}

export type { UpdateComentarioUsecase, UpdateComentarioUsecaseParams };
