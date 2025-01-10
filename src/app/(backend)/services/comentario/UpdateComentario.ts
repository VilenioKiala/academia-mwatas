import {
  validate,
  ValidationError as ClassValidatorValidationError,
} from "class-validator";
import _ from "lodash";
import { ValidationError } from "../../helpers/errors/ValidationError";
import { NotFoundError } from "../../helpers/errors/NotFound";
import {
  UpdateComentarioUsecase,
  UpdateComentarioUsecaseParams,
} from "../../interfaces/usecases/comentarios/UpdateComentarioUsecase";
import { IComentario } from "../../interfaces/objects/IComentario";
import { IComentarioRepository } from "../../interfaces/repositories/IComentarioRepository";
import { comentarioRepository } from "../../repositories/MysqlSequelizeRepository/ComentarioRepository";

class UpdateComentarioService implements UpdateComentarioUsecase {
  constructor(private comentarioRepository: IComentarioRepository) {}

  async validateComentario(comentario: IComentario) {
    const validation = await validate(comentario, {
      skipUndefinedProperties: true,
    });

    if (validation[0] instanceof ClassValidatorValidationError) {
      const message = _.values(validation[0].constraints)[0];

      const field = validation[0].property;

      throw new ValidationError(message, field);
    }
  }

  async update(params: UpdateComentarioUsecaseParams, comentarioId: string) {
    const comentario = await this.comentarioRepository.getOne(comentarioId);

    if (!comentario) {
      throw new NotFoundError("Curso não encontrado", "curso");
    }

    comentario.assign({
      ...params,
    });

    await this.validateComentario(comentario);

    const comentarioUpdated = await this.comentarioRepository.update(
      comentario,
      comentarioId,
      params.videoaulaId
    );

    return { comentario: comentarioUpdated, updated: true };
  }
}

const updateComentarioService = new UpdateComentarioService(
  comentarioRepository
);

export { updateComentarioService };
