import { IComentario } from "../../objects/IComentario";

type GetAllComentariosUsecaseParams = {
  lido?: boolean;
  reprovado?: boolean;
  userId?: string;
};

interface GetAllComentariosUsecase {
  get(filter?: GetAllComentariosUsecaseParams): Promise<IComentario[]>;
}

export type { GetAllComentariosUsecase, GetAllComentariosUsecaseParams };
