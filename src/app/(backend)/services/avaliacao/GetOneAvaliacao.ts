import { IAvaliacaoRepository } from "../../interfaces/repositories/IAvaliacaoRepository";
import { GetOneAvaliacaoUsecase } from "../../interfaces/usecases/avaliacoes/GetOneAvaliacaoUsecase";
import { avaliacaoRepository } from "../../repositories/MysqlSequelizeRepository/AvaliacaoRepository";

class GetOneAvaliacaoService implements GetOneAvaliacaoUsecase {
  constructor(private avaliacaoRepository: IAvaliacaoRepository) {}

  async get(id: string) {
    const avaliacao = await this.avaliacaoRepository.getOne(id);

    return avaliacao;
  }
}

const getOneAvaliacaoService = new GetOneAvaliacaoService(avaliacaoRepository);

export { getOneAvaliacaoService };
