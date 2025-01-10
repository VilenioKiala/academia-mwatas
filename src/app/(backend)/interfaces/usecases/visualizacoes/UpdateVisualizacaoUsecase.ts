import { IVisualizacao } from "../../objects/IVisualizacao";

type UpdateVisualizacaoUsecaseParams = {
  id: string;
  nota?: number;
  videoaulaId?: string;
  userId?: string;
};

interface UpdateVisualizacaoUsecase {
  update(
    params: UpdateVisualizacaoUsecaseParams
  ): Promise<{ visualizacao: IVisualizacao; updated: boolean }>;
}

export type { UpdateVisualizacaoUsecase, UpdateVisualizacaoUsecaseParams };
