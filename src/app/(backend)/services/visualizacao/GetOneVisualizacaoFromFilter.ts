import { IVisualizacaoRepository } from "../../interfaces/repositories/IVisualizacaoRepository";
import { visualizacaoRepository } from "../../repositories/MysqlSequelizeRepository/VisualizacaoRepository";

class GetOneVisualizacaoFromFilter implements GetOneVisualizacaoFromFilter {
  constructor(private visualizacaoRepository: IVisualizacaoRepository) {}

  async get(filter?: { userId?: string; videoaulaId?: string }) {
    const avaliacao =
      await this.visualizacaoRepository.getOneVisualizacaoFromFilter({
        userId: filter.userId,
        videoaulaId: filter.videoaulaId,
      });

    return avaliacao;
  }
}

const getOneVisualizacaoFromFilter = new GetOneVisualizacaoFromFilter(
  visualizacaoRepository
);

export { getOneVisualizacaoFromFilter };
