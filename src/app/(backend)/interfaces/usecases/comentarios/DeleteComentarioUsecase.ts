import { IComentario } from "../../objects/IComentario";

interface DeleteComentarioUsecase {
  delete(id: string): Promise<{ comentario: IComentario; deleted: boolean }>;
}

export type { DeleteComentarioUsecase };
