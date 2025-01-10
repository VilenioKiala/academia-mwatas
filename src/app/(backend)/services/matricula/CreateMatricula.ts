import {
  validate,
  ValidationError as ClassValidatorValidationError,
} from "class-validator";
import _ from "lodash";
import { ValidationError } from "../../helpers/errors/ValidationError";
import {
  CreateMatriculaUsecase,
  CreateMatriculaUsecaseParams,
} from "../../interfaces/usecases/matriculas/CreateMatriculaUsecase";
import { Matricula } from "../../entities/Matricula";
import { IMatricula } from "../../interfaces/objects/IMatricula";
import { IMatriculaRepository } from "../../interfaces/repositories/IMatriculaRepository";
import { matriculaRepository } from "../../repositories/MysqlSequelizeRepository/MatriculaRepository";

class CreateMatriculaService implements CreateMatriculaUsecase {
  constructor(private matriculaRepository: IMatriculaRepository) {}

  async validateMatricula(matricula: IMatricula) {
    const validation = await validate(matricula, {
      skipUndefinedProperties: true,
    });

    if (validation[0] instanceof ClassValidatorValidationError) {
      const message = _.values(validation[0].constraints)[0];

      const field = validation[0].property;

      throw new ValidationError(message, field);
    }
  }

  async create(params: CreateMatriculaUsecaseParams) {
    console.log("matricula", params);
    let matricula = await this.matriculaRepository.getOneFromCursoAndUser(
      params.cursoId,
      params.userId
    );

    if (!matricula) {
      matricula = new Matricula();

      matricula.assign({ ...params });

      await this.validateMatricula(matricula);

      const matriculaCreated = await this.matriculaRepository.create(matricula);

      console.log("Matricula criada", matriculaCreated);

      return matriculaCreated;
    }

    matricula.assign({
      ...params,
    });

    await this.validateMatricula(matricula);

    const matriculaUpdated = await this.matriculaRepository.update(matricula);

    return matriculaUpdated;
  }
}

const createMatriculaService = new CreateMatriculaService(matriculaRepository);

export { createMatriculaService };
