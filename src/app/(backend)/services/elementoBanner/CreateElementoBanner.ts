import {
  validate,
  ValidationError as ClassValidatorValidationError,
  isEmpty,
} from "class-validator";
import _ from "lodash";
import { writeFile } from "node:fs/promises";
import path from "path";
import { ValidationError } from "../../helpers/errors/ValidationError";
import { IElementoBannerRepository } from "../../interfaces/repositories/IElementoBannerRepository";
import { IElementoBanner } from "../../interfaces/objects/IElementoBanner";
import { elementoBannerRepository } from "../../repositories/MysqlSequelizeRepository/ElementoBannerRepository";
import {
  CreateElementoBannerParams,
  CreateElementoBannerUsecase,
} from "../../interfaces/usecases/elementosBanner/CreateElementoBannerUsecase";
import { ElementoBanner } from "../../entities/ElementoBanner";

class CreateElementoBannerService implements CreateElementoBannerUsecase {
  constructor(private elementoBannerRepository: IElementoBannerRepository) {}

  async validateElementoBanner(elementoBanner: IElementoBanner) {
    const validation = await validate(elementoBanner);

    if (validation[0] instanceof ClassValidatorValidationError) {
      const message = _.values(validation[0].constraints)[0];

      const field = validation[0].property;

      throw new ValidationError(message, field);
    }
  }

  async saveElementoBannerPhoto(photo: File) {
    const photoBuffer = Buffer.from(await photo.arrayBuffer());
    const filename = `${Date.now()}${photo.name.replaceAll(" ", "_")}`;

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
        "images",
        "elementoBannerPhotos",
        filename
      ),
      photoBuffer
    );

    return {
      filename,
    };
  }

  async create(params: CreateElementoBannerParams) {
    if (!params.photo || isEmpty(params.photo.name)) {
      throw new ValidationError(
        "A foto do elemento do banner é obrigatória!",
        "elementoBanner"
      );
    }

    const elementoBanner = new ElementoBanner();

    elementoBanner.create({
      ...params,
      photo: undefined,
    });

    await this.validateElementoBanner(elementoBanner);

    const { filename } = await this.saveElementoBannerPhoto(params.photo);

    console.log(filename);

    elementoBanner.photo = filename;

    const elementoBannerCreated = await this.elementoBannerRepository.create(
      elementoBanner,
      params.cursoId
    );

    return elementoBannerCreated;
  }
}

const createElementoBannerService = new CreateElementoBannerService(
  elementoBannerRepository
);

export { createElementoBannerService };
