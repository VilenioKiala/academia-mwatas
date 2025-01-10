import {
  ValidationError as ClassValidatorValidationError,
  validate,
} from "class-validator";
import _ from "lodash";
import { ValidationError } from "../../helpers/errors/ValidationError";
import {
  CreateAvaliacaoUsecase,
  CreateAvaliacaoUsecaseParams,
} from "../../interfaces/usecases/avaliacoes/CreateAvaliacaoUsecase";
import { Avaliacao } from "../../entities/Avaliacao";
import { IAvaliacaoRepository } from "../../interfaces/repositories/IAvaliacaoRepository";
import { avaliacaoRepository } from "../../repositories/MysqlSequelizeRepository/AvaliacaoRepository";

class CreateAvaliacaoService implements CreateAvaliacaoUsecase {
  constructor(private avaliacaoRepository: IAvaliacaoRepository) {}

  async create(params: CreateAvaliacaoUsecaseParams) {
    const avaliacao = new Avaliacao();

    avaliacao.assign({
      ...params,
    });

    const validation = await validate(avaliacao);

    if (validation[0] instanceof ClassValidatorValidationError) {
      const message = _.values(validation[0].constraints)[0];

      const field = validation[0].property;

      throw new ValidationError(message, field);
    }

    const avaliacaoCreated = await this.avaliacaoRepository.create(avaliacao);

    return avaliacaoCreated;
  }
}

const createAvaliacaoService = new CreateAvaliacaoService(avaliacaoRepository);

export { createAvaliacaoService };
