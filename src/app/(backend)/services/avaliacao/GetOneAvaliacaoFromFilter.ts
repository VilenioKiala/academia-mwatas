import { IAvaliacaoRepository } from "../../interfaces/repositories/IAvaliacaoRepository";
import { avaliacaoRepository } from "../../repositories/MysqlSequelizeRepository/AvaliacaoRepository";

class GetOneAvaliacaoFromFilter implements GetOneAvaliacaoFromFilter {
  constructor(private avaliacaoRepository: IAvaliacaoRepository) {}

  async get(filter?: { userId?: string; videoaulaId?: string }) {
    const avaliacao = await this.avaliacaoRepository.getOneAvaliacaoFromFilter({
      userId: filter.userId,
      videoaulaId: filter.videoaulaId,
    });

    return avaliacao;
  }
}

const getOneAvaliacaoFromFilter = new GetOneAvaliacaoFromFilter(
  avaliacaoRepository
);

export { getOneAvaliacaoFromFilter };
