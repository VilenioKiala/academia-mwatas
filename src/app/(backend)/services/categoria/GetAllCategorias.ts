import { ICategoriaRepository } from "../../interfaces/repositories/ICategoriaRepository";
import { GetAllCategoriasUsecase } from "../../interfaces/usecases/categorias/GetAllCategoriasUsecase";
import { categoriaRepository } from "../../repositories/MysqlSequelizeRepository/CategoriaRepository";

class GetAllCategoriasService implements GetAllCategoriasUsecase {
  constructor(private categoriaRepository: ICategoriaRepository) {}

  async get() {
    const categorias = await this.categoriaRepository.getAll();

    return categorias;
  }
}

const getAllCategoriasService = new GetAllCategoriasService(
  categoriaRepository
);

export { getAllCategoriasService };
