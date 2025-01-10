import { IVisualizacaoRepository } from "../../interfaces/repositories/IVisualizacaoRepository";
import { GetOneVisualizacaoUsecase } from "../../interfaces/usecases/visualizacoes/GetOneVisualizacaoUsecase";
import { visualizacaoRepository } from "../../repositories/MysqlSequelizeRepository/VisualizacaoRepository";

class GetOneVisualizacaoService implements GetOneVisualizacaoUsecase {
  constructor(private visualizacaoRepository: IVisualizacaoRepository) {}

  async get(id: string) {
    const visualizacao = await this.visualizacaoRepository.getOne(id);

    return visualizacao;
  }
}

const getOneVisualizacaoService = new GetOneVisualizacaoService(
  visualizacaoRepository
);

export { getOneVisualizacaoService };
