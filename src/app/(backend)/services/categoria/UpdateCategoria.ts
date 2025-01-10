import {
  validate,
  ValidationError as ClassValidatorValidationError,
} from "class-validator";
import _ from "lodash";
import { ValidationError } from "../../helpers/errors/ValidationError";
import { NotFoundError } from "../../helpers/errors/NotFound";
import { categoriaRepository } from "../../repositories/MysqlSequelizeRepository/CategoriaRepository";
import { ICategoria } from "../../interfaces/objects/ICategoria";
import {
  UpdateCategoriaUsecase,
  UpdateCategoriaUsecaseParams,
} from "../../interfaces/usecases/categorias/UpdateCategoriaUsecase";
import { ICategoriaRepository } from "../../interfaces/repositories/ICategoriaRepository";

class UpdateCategoriaService implements UpdateCategoriaUsecase {
  constructor(private categoriaRepository: ICategoriaRepository) {}

  async validateCategory(category: ICategoria) {
    const validation = await validate(category);

    if (validation[0] instanceof ClassValidatorValidationError) {
      const message = _.values(validation[0].constraints)[0];

      const field = validation[0].property;

      throw new ValidationError(message, field);
    }
  }

  async update(params: UpdateCategoriaUsecaseParams, categoriaId: string) {
    const categoria = await this.categoriaRepository.getOne(categoriaId);

    if (!categoria) {
      throw new NotFoundError("Curso não encontrado", "curso");
    }

    categoria.assign({
      titulo: params.titulo,
    });

    await this.validateCategory(categoria);

    const categoriaUpdated = await this.categoriaRepository.update(
      categoria,
      categoriaId
    );

    return { categoria: categoriaUpdated, updated: true };
  }
}

const updateCategoriaService = new UpdateCategoriaService(categoriaRepository);

export { updateCategoriaService };
