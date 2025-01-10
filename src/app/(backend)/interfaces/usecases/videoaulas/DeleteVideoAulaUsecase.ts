import { IVideoAula } from "../../objects/IVideoAula";

interface DeleteVideoAulaUsecase {
  delete(id: string): Promise<{ videoaula: IVideoAula; deleted: boolean }>;
}

export type { DeleteVideoAulaUsecase };
