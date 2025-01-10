import {
  ValidationError as ClassValidatorValidationError,
  validate,
} from "class-validator";
import _ from "lodash";
import { ValidationError } from "../../helpers/errors/ValidationError";
import { IRespostaComentarioRepository } from "../../interfaces/repositories/IRespostaComentarioRepository";
import {
  CreateRespostaComentarioParams,
  CreateRespostaComentarioUsecase,
} from "../../interfaces/usecases/respostasComentario/CreateRespostaComentarioUsecase";
import { RespostaComentario } from "../../entities/RespostaComentario";
import { respostaComentarioRepository } from "../../repositories/MysqlSequelizeRepository/RespostaComentarioRepository";

class CreateRespostaComentarioService
  implements CreateRespostaComentarioUsecase
{
  constructor(
    private respostaComentarioRepository: IRespostaComentarioRepository
  ) {}

  async create(params: CreateRespostaComentarioParams) {
    const respostaComentario = new RespostaComentario();

    respostaComentario.create({
      ...params,
    });

    const validation = await validate(respostaComentario);

    if (validation[0] instanceof ClassValidatorValidationError) {
      const message = _.values(validation[0].constraints)[0];

      const field = validation[0].property;

      throw new ValidationError(message, field);
    }

    const respostaComentarioCreated =
      await this.respostaComentarioRepository.create(respostaComentario);

    return respostaComentarioCreated;
  }
}

const createRespostaComentarioService = new CreateRespostaComentarioService(
  respostaComentarioRepository
);

export { createRespostaComentarioService };
