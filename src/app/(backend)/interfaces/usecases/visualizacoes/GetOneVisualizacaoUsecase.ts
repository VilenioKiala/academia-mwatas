import { IVisualizacao } from "../../objects/IVisualizacao";

interface GetOneVisualizacaoUsecase {
  get(id: string): Promise<IVisualizacao | null>;
}

export type { GetOneVisualizacaoUsecase };
