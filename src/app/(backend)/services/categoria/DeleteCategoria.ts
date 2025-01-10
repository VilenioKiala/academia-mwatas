import { ICategoriaRepository } from "../../interfaces/repositories/ICategoriaRepository";
import { DeleteCategoriaUsecase } from "../../interfaces/usecases/categorias/DeleteCategoriaUsecase";
import { categoriaRepository } from "../../repositories/MysqlSequelizeRepository/CategoriaRepository";

class DeleteCategoriaService implements DeleteCategoriaUsecase {
  constructor(private categoriaRepository: ICategoriaRepository) {}

  async delete(id: string) {
    const categoria = await this.categoriaRepository.delete(id);

    return { categoria, deleted: true };
  }
}

const deleteCategoriaService = new DeleteCategoriaService(categoriaRepository);

export { deleteCategoriaService };
