import {
  validate,
  ValidationError as ClassValidatorValidationError,
} from "class-validator";
import _ from "lodash";
import { ValidationError } from "../../helpers/errors/ValidationError";
import { NotFoundError } from "../../helpers/errors/NotFound";
import {
  UpdateAvaliacaoUsecase,
  UpdateAvaliacaoUsecaseParams,
} from "../../interfaces/usecases/avaliacoes/UpdateAvaliacaoUsecase";
import { IAvaliacaoRepository } from "../../interfaces/repositories/IAvaliacaoRepository";
import { IAvaliacao } from "../../interfaces/objects/IAvaliacao";
import { avaliacaoRepository } from "../../repositories/MysqlSequelizeRepository/AvaliacaoRepository";

class UpdateAvaliacaoService implements UpdateAvaliacaoUsecase {
  constructor(private avaliacaoRepository: IAvaliacaoRepository) {}

  async validateAvaliacao(avaliacao: IAvaliacao) {
    const validation = await validate(avaliacao);

    if (validation[0] instanceof ClassValidatorValidationError) {
      const message = _.values(validation[0].constraints)[0];

      const field = validation[0].property;

      throw new ValidationError(message, field);
    }
  }

  async update(params: UpdateAvaliacaoUsecaseParams) {
    const avaliacao = await this.avaliacaoRepository.getOne(params.id);

    if (!avaliacao) {
      throw new NotFoundError("Avaliação não encontrada", "avaliacao");
    }

    avaliacao.assign({
      ...params,
    });

    await this.validateAvaliacao(avaliacao);

    const avaliacaoUpdated = await this.avaliacaoRepository.update(
      avaliacao,
      params.id
    );

    return { avaliacao: avaliacaoUpdated, updated: true };
  }
}

const updateAvaliacaoService = new UpdateAvaliacaoService(avaliacaoRepository);

export { updateAvaliacaoService };
