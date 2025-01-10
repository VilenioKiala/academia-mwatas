import { DeleteModuleUsecase } from "../../interfaces/usecases/modules/DeleteModuleUsecase";
import { IModuleRepository } from "../../interfaces/repositories/IModuleRepository";
import { moduleRepository } from "../../repositories/MysqlSequelizeRepository/ModuleRepository";

class DeleteModuleService implements DeleteModuleUsecase {
  constructor(private moduloRepository: IModuleRepository) {}

  async delete(id: string) {
    const modulo = await this.moduloRepository.delete(id);

    return { modulo, deleted: true };
  }
}

const deleteModuleService = new DeleteModuleService(moduleRepository);

export { deleteModuleService };
