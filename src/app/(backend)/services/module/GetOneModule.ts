import { IModuleRepository } from "../../interfaces/repositories/IModuleRepository";
import { GetOneModuleUsecase } from "../../interfaces/usecases/modules/GetOneModuleUsecase";
import { moduleRepository } from "../../repositories/MysqlSequelizeRepository/ModuleRepository";

class GetOneModuleService implements GetOneModuleUsecase {
  constructor(private moduleRepository: IModuleRepository) {}

  async get(id: string) {
    const modulo = await this.moduleRepository.getOne(id);

    return modulo;
  }
}

const getOneModuleService = new GetOneModuleService(moduleRepository);

export { getOneModuleService };
