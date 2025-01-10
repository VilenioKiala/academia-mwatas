import { IVisualizacao } from "../../objects/IVisualizacao";

interface GetAllVisualizacoesUsecase {
  get(filter: {
    videoaulaId?: string;
    userId?: string;
  }): Promise<IVisualizacao[]>;
}

export type { GetAllVisualizacoesUsecase };
