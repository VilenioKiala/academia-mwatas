import {
  validate,
  ValidationError as ClassValidatorValidationError,
  isEmpty,
} from "class-validator";
import _ from "lodash";
import { writeFile } from "node:fs/promises";
import path from "path";
import { ValidationError } from "../../helpers/errors/ValidationError";
import { IMaterialComplementar } from "../../interfaces/objects/IMaterialComplementar";
import {
  CreateMaterialComplementarUsecase,
  CreateMaterialComplementarUsecaseParams,
} from "../../interfaces/usecases/materiaisComplementares/CreateMaterialComplementarUsecase";
import { IMaterialComplementarRepository } from "../../interfaces/repositories/IMaterialComplementarRepository";
import { MaterialComplementar } from "../../entities/MaterialComplementar";
import { materialComplementarRepository } from "../../repositories/MysqlSequelizeRepository/MaterialComplementarRepository";

class CreateMaterialComplementarService
  implements CreateMaterialComplementarUsecase
{
  constructor(
    private materialComplementarRepository: IMaterialComplementarRepository
  ) {}

  async validateMaterialComplementar(
    materialComplementar: IMaterialComplementar
  ) {
    const validation = await validate(materialComplementar);

    if (validation[0] instanceof ClassValidatorValidationError) {
      const message = _.values(validation[0].constraints)[0];

      const field = validation[0].property;

      throw new ValidationError(message, field);
    }
  }

  async saveFicheiro(ficheiro: File) {
    const ficheiroBuffer = Buffer.from(await ficheiro.arrayBuffer());
    const filename = `${Date.now()}${ficheiro.name.replaceAll(" ", "_")}`;

    console.log(filename);

    await writeFile(
      path.resolve(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "..",
        "..",
        "public",
        "storage",
        "materiais_complementares",
        filename
      ),
      ficheiroBuffer
    );

    return {
      filename,
    };
  }

  async create(params: CreateMaterialComplementarUsecaseParams) {
    if (!params.ficheiro || isEmpty(params.ficheiro.name)) {
      throw new ValidationError(
        "O ficheiro do material complementar é obrigatória!",
        "material_complementar"
      );
    }

    const materialComplementar = new MaterialComplementar();

    materialComplementar.assign({
      ...params,
      ficheiro: undefined,
    });

    await this.validateMaterialComplementar(materialComplementar);

    const { filename } = await this.saveFicheiro(params.ficheiro);

    console.log(filename);

    materialComplementar.ficheiro = filename;

    const materialComplementarCreated =
      await this.materialComplementarRepository.create(
        materialComplementar,
        params.videoaulaId
      );

    return materialComplementarCreated;
  }
}

const createMaterialComplementarService = new CreateMaterialComplementarService(
  materialComplementarRepository
);

export { createMaterialComplementarService };
