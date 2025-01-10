import { IAvaliacao } from "../../objects/IAvaliacao";

interface GetOneAvaliacaoFromFilterUsecase {
  get(filter?: {
    userId?: string;
    videoaulaId?: string;
  }): Promise<IAvaliacao | null>;
}

export type { GetOneAvaliacaoFromFilterUsecase };
