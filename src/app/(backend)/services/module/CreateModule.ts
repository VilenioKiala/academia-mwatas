import { validate } from "class-validator";
import { ValidationError as ClassValidatorValidationError } from "class-validator";
import _ from "lodash";
import { moduleRepository } from "../../repositories/MysqlSequelizeRepository/ModuleRepository";
import { IModuleRepository } from "../../interfaces/repositories/IModuleRepository";
import {
  CreateModuleParams,
  CreateModuleUsecase,
} from "../../interfaces/usecases/modules/CreateModuleUsecase";
import { ValidationError } from "../../helpers/errors/ValidationError";
import { IModulo } from "../../interfaces/objects/IModule";
import { Modulo } from "../../entities/Modulo";

class CreateModuleService implements CreateModuleUsecase {
  constructor(private moduleRepository: IModuleRepository) {}

  async validateModule(modulo: IModulo) {
    const validation = await validate(modulo);

    if (validation[0] instanceof ClassValidatorValidationError) {
      const message = _.values(validation[0].constraints)[0];

      const field = validation[0].property;

      throw new ValidationError(message, field);
    }
  }

  async create(params: CreateModuleParams) {
    const modulo = new Modulo();

    modulo.create({
      ...params,
    });

    await this.validateModule(modulo);

    const moduloCreated = await this.moduleRepository.create(
      modulo,
      params.cursoId
    );

    return moduloCreated;
  }
}

const createModuleService = new CreateModuleService(moduleRepository);

export { createModuleService };
