import { IModuleRepository } from "../../interfaces/repositories/IModuleRepository";
import { GetAllModulesUsecase } from "../../interfaces/usecases/modules/GetAllModulesUsecase";
import { moduleRepository } from "../../repositories/MysqlSequelizeRepository/ModuleRepository";

class GetAllModulesService implements GetAllModulesUsecase {
  constructor(private moduleRepository: IModuleRepository) {}

  async get() {
    const modules = await this.moduleRepository.getAll();

    return modules;
  }
}

const getAllModulesService = new GetAllModulesService(moduleRepository);

export { getAllModulesService };
