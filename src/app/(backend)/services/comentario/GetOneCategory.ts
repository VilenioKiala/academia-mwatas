import { ICategoryRepository } from "../../interfaces/repositories/ICategoriaRepository";
import { GetOneCategoryUsecase } from "../../interfaces/usecases/categorias/GetOneCategoriaUsecase";
import { categoryRepository } from "../../repositories/MysqlSequelizeRepository/CategoriaRepository";

class GetOneCategoryService implements GetOneCategoryUsecase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async get(id: string) {
    const category = await this.categoryRepository.getOne(id);

    return category;
  }
}

const getOneCategoryService = new GetOneCategoryService(categoryRepository);

export { getOneCategoryService };
