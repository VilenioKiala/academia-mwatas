import {
  validate,
  ValidationError as ClassValidatorValidationError,
} from "class-validator";
import _ from "lodash";
import { ValidationError } from "../../helpers/errors/ValidationError";
import { NotFoundError } from "../../helpers/errors/NotFound";
import {
  UpdateVisualizacaoUsecase,
  UpdateVisualizacaoUsecaseParams,
} from "../../interfaces/usecases/visualizacoes/UpdateVisualizacaoUsecase";
import { IVisualizacaoRepository } from "../../interfaces/repositories/IVisualizacaoRepository";
import { visualizacaoRepository } from "../../repositories/MysqlSequelizeRepository/VisualizacaoRepository";
import { IVisualizacao } from "../../interfaces/objects/IVisualizacao";

class UpdateVisualizacaoService implements UpdateVisualizacaoUsecase {
  constructor(private visualizacaoRepository: IVisualizacaoRepository) {}

  async validate(visualizacao: IVisualizacao) {
    const validation = await validate(visualizacao);

    if (validation[0] instanceof ClassValidatorValidationError) {
      const message = _.values(validation[0].constraints)[0];

      const field = validation[0].property;

      throw new ValidationError(message, field);
    }
  }

  async update(params: UpdateVisualizacaoUsecaseParams) {
    const visualizacao = await this.visualizacaoRepository.getOne(params.id);

    if (!visualizacao) {
      throw new NotFoundError("Avaliação não encontrada", "visualizacao");
    }

    visualizacao.assign({
      ...params,
    });

    await this.validate(visualizacao);

    const visualizacaoUpdated = await this.visualizacaoRepository.update(
      visualizacao,
      params.id
    );

    return { visualizacao: visualizacaoUpdated, updated: true };
  }
}

const updateVisualizacaoService = new UpdateVisualizacaoService(
  visualizacaoRepository
);

export { updateVisualizacaoService };
