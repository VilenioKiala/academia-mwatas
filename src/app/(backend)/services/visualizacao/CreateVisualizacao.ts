import {
  ValidationError as ClassValidatorValidationError,
  validate,
} from "class-validator";
import _ from "lodash";
import { ValidationError } from "../../helpers/errors/ValidationError";
import {
  CreateVisualizacaoUsecaseParams,
  CreateVisualizacaoUsecaseUsecase,
} from "../../interfaces/usecases/visualizacoes/CreateVisualizacaoUsecase";
import { IVisualizacaoRepository } from "../../interfaces/repositories/IVisualizacaoRepository";
import { Visualizacao } from "../../entities/Visualizacao";
import { visualizacaoRepository } from "../../repositories/MysqlSequelizeRepository/VisualizacaoRepository";

class CreateVisualizacaoService implements CreateVisualizacaoUsecaseUsecase {
  constructor(private visualizacaoRepository: IVisualizacaoRepository) {}

  async create(params: CreateVisualizacaoUsecaseParams) {
    const visualizacao = new Visualizacao();

    visualizacao.assign({
      ...params,
    });

    const validation = await validate(visualizacao);

    if (validation[0] instanceof ClassValidatorValidationError) {
      const message = _.values(validation[0].constraints)[0];

      const field = validation[0].property;

      throw new ValidationError(message, field);
    }

    const visualizacaoCreated = await this.visualizacaoRepository.create(
      visualizacao
    );

    return visualizacaoCreated;
  }
}

const createVisualizacaoService = new CreateVisualizacaoService(
  visualizacaoRepository
);

export { createVisualizacaoService };
