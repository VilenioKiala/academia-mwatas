import { IVisualizacao } from "../../objects/IVisualizacao";

interface GetOneVisualizacaoFromFilterUsecase {
  get(filter?: {
    userId?: string;
    videoaulaId?: string;
  }): Promise<IVisualizacao | null>;
}

export type { GetOneVisualizacaoFromFilterUsecase };
