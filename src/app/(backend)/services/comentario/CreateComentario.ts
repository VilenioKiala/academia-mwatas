import {
  ValidationError as ClassValidatorValidationError,
  validate,
} from "class-validator";
import _ from "lodash";
import { ValidationError } from "../../helpers/errors/ValidationError";
import {
  CreateComentarioParams,
  CreateComentarioUsecase,
} from "../../interfaces/usecases/comentarios/CreateComentarioUsecase";
import { Comentario } from "../../entities/Comentario";
import { comentarioRepository } from "../../repositories/MysqlSequelizeRepository/ComentarioRepository";
import { IComentarioRepository } from "../../interfaces/repositories/IComentarioRepository";

class CreateComentarioService implements CreateComentarioUsecase {
  constructor(private comentarioRepository: IComentarioRepository) {}

  async create(params: CreateComentarioParams) {
    const comentario = new Comentario();

    comentario.assign({
      ...params,
    });

    console.log(comentario);

    const validation = await validate(comentario);

    if (validation[0] instanceof ClassValidatorValidationError) {
      const message = _.values(validation[0].constraints)[0];

      const field = validation[0].property;

      throw new ValidationError(message, field);
    }

    const comentarioCreated = await this.comentarioRepository.create(
      comentario
    );

    return comentarioCreated;
  }
}

const createComentarioService = new CreateComentarioService(
  comentarioRepository
);

export { createComentarioService };
