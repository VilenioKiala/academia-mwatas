import { IVisualizacaoRepository } from "../../interfaces/repositories/IVisualizacaoRepository";
import { DeleteVisualizacaoUsecase } from "../../interfaces/usecases/visualizacoes/DeleteVisualizacaoUsecase";
import { visualizacaoRepository } from "../../repositories/MysqlSequelizeRepository/VisualizacaoRepository";

class DeleteVisualizacaoService implements DeleteVisualizacaoUsecase {
  constructor(private visualizacaoRepository: IVisualizacaoRepository) {}

  async delete(id: string) {
    const visualizacao = await this.visualizacaoRepository.delete(id);

    return { visualizacao, deleted: true };
  }
}

const deleteVisualizacaoService = new DeleteVisualizacaoService(
  visualizacaoRepository
);

export { deleteVisualizacaoService };
