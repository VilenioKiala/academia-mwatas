import { ICategoriaRepository } from "../../interfaces/repositories/ICategoriaRepository";
import { GetOneCategoriaUsecase } from "../../interfaces/usecases/categorias/GetOneCategoriaUsecase";
import { categoriaRepository } from "../../repositories/MysqlSequelizeRepository/CategoriaRepository";

class GetOneCategoriaService implements GetOneCategoriaUsecase {
  constructor(private categoriaRepository: ICategoriaRepository) {}

  async get(id: string) {
    const categoria = await this.categoriaRepository.getOne(id);

    return categoria;
  }
}

const getOneCategoriaService = new GetOneCategoriaService(categoriaRepository);

export { getOneCategoriaService };
