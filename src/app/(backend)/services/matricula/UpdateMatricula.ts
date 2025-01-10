import {
  validate,
  ValidationError as ClassValidatorValidationError,
} from "class-validator";
import _ from "lodash";
import { ValidationError } from "../../helpers/errors/ValidationError";
import { NotFoundError } from "../../helpers/errors/NotFound";
import { IMatriculaRepository } from "../../interfaces/repositories/IMatriculaRepository";
import { IMatricula } from "../../interfaces/objects/IMatricula";
import {
  UpdateMatriculaUsecase,
  UpdateMatriculaUsecaseParams,
} from "../../interfaces/usecases/matriculas/UpdateMatriculaUsecase";
import { matriculaRepository } from "../../repositories/MysqlSequelizeRepository/MatriculaRepository";

class UpdateMatriculaService implements UpdateMatriculaUsecase {
  constructor(private matriculaRepository: IMatriculaRepository) {}

  async validate(matricula: IMatricula) {
    const validation = await validate(matricula);

    if (validation[0] instanceof ClassValidatorValidationError) {
      const message = _.values(validation[0].constraints)[0];

      const field = validation[0].property;

      throw new ValidationError(message, field);
    }
  }

  async update(params: UpdateMatriculaUsecaseParams) {
    const matricula = await this.matriculaRepository.getOne(params.id);

    if (!matricula) {
      throw new NotFoundError("Matrícula não encontrado", "curso");
    }

    matricula.assign({
      ...params,
    });

    matricula.id = params.id;

    await this.validate(matricula);

    const matriculaUpdated = await this.matriculaRepository.update(matricula);

    return { matricula: matriculaUpdated, updated: true };
  }
}

const updateMatriculaService = new UpdateMatriculaService(matriculaRepository);

export { updateMatriculaService };
