import {
  ValidationError as ClassValidatorValidationError,
  validate,
} from "class-validator";
import _ from "lodash";
import { ValidationError } from "../../helpers/errors/ValidationError";
import { categoriaRepository } from "../../repositories/MysqlSequelizeRepository/CategoriaRepository";
import { Categoria } from "../../entities/Categoria";
import {
  CreateCategoriaUsecase,
  CreateCategoriaUsecaseParams,
} from "../../interfaces/usecases/categorias/CreateCategoriaUsecase";
import { ICategoriaRepository } from "../../interfaces/repositories/ICategoriaRepository";

class CreateCategoriaService implements CreateCategoriaUsecase {
  constructor(private categoriaRepository: ICategoriaRepository) {}

  async create(params: CreateCategoriaUsecaseParams) {
    const categoria = new Categoria();

    categoria.assign({
      ...params,
    });

    const validation = await validate(categoria);

    if (validation[0] instanceof ClassValidatorValidationError) {
      const message = _.values(validation[0].constraints)[0];

      const field = validation[0].property;

      throw new ValidationError(message, field);
    }

    const categoryCreated = await this.categoriaRepository.create(categoria);

    return categoryCreated;
  }
}

const createCategoriaService = new CreateCategoriaService(categoriaRepository);

export { createCategoriaService };
