import { IVisualizacaoRepository } from "../../interfaces/repositories/IVisualizacaoRepository";
import { GetAllVisualizacoesUsecase } from "../../interfaces/usecases/visualizacoes/GetAllVisualizacoesUsecase";
import { visualizacaoRepository } from "../../repositories/MysqlSequelizeRepository/VisualizacaoRepository";

class GetAllVisualizacoesService implements GetAllVisualizacoesUsecase {
  constructor(private visualizacaoRepository: IVisualizacaoRepository) {}

  async get(filter?: { userId?: string; videoaulaId: string }) {
    const visualizacao = await this.visualizacaoRepository.getAll(filter);

    return visualizacao;
  }
}

const getAllVisualizacoesService = new GetAllVisualizacoesService(
  visualizacaoRepository
);

export { getAllVisualizacoesService };
