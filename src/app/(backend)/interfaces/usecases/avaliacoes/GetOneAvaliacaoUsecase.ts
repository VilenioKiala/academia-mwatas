import { IAvaliacao } from "../../objects/IAvaliacao";

interface GetOneAvaliacaoUsecase {
  get(id: string): Promise<IAvaliacao | null>;
}

export type { GetOneAvaliacaoUsecase };
