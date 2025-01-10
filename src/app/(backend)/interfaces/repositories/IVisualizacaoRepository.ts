import { IVisualizacao } from "../objects/IVisualizacao";

interface IVisualizacaoRepository {
  getAll(filter?: {
    videoaulaId?: string;
    userId?: string;
  }): Promise<IVisualizacao[]>;
  getOne(id: string): Promise<IVisualizacao | null>;
  getOneVisualizacaoFromFilter(filter?: {
    userId?: string;
    videoaulaId?: string;
  }): Promise<IVisualizacao | null>;
  create(visualizacao: IVisualizacao): Promise<IVisualizacao>;
  update(
    avaliacao: IVisualizacao,
    visualizacaoId: string
  ): Promise<IVisualizacao>;
  delete(id: string): Promise<IVisualizacao>;
}

export type { IVisualizacaoRepository };
