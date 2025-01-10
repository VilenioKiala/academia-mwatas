import { IComentario } from "../../objects/IComentario";

interface GetOneComentarioUsecase {
  get(id: string): Promise<IComentario | null>;
}

export type { GetOneComentarioUsecase };
