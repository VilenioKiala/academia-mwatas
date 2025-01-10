import { IVisualizacao } from "../../objects/IVisualizacao";

interface DeleteVisualizacaoUsecase {
  delete(
    id: string
  ): Promise<{ visualizacao: IVisualizacao; deleted: boolean }>;
}

export type { DeleteVisualizacaoUsecase };
