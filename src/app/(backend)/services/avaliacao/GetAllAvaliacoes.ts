import { IAvaliacaoRepository } from "../../interfaces/repositories/IAvaliacaoRepository";
import { GetAllAvaliacoesUsecase } from "../../interfaces/usecases/avaliacoes/GetAllAvaliacoesUsecase";
import { avaliacaoRepository } from "../../repositories/MysqlSequelizeRepository/AvaliacaoRepository";

class GetAllAvaliacoesService implements GetAllAvaliacoesUsecase {
  constructor(private avaliacaoRepository: IAvaliacaoRepository) {}

  async get() {
    const avaliacoes = await this.avaliacaoRepository.getAll();

    return avaliacoes;
  }
}

const getAllAvaliacoesService = new GetAllAvaliacoesService(
  avaliacaoRepository
);

export { getAllAvaliacoesService };
