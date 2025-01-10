import {
  validate,
  ValidationError as ClassValidatorValidationError,
  isEmpty,
} from "class-validator";
import _ from "lodash";
import { writeFile } from "node:fs/promises";
import path from "path";
import { ValidationError } from "../../helpers/errors/ValidationError";
import {
  CreateConviteUsecase,
  CreateConviteUsecaseParams,
} from "../../interfaces/usecases/convites/CreateConviteUsecase";
import { IConviteRepository } from "../../interfaces/repositories/IConviteRepository";
import { IConvite } from "../../interfaces/objects/IConvite";
import { Convite } from "../../entities/Convite";
import { conviteRepository } from "../../repositories/MysqlSequelizeRepository/ConviteRepository";

class CreateConviteService implements CreateConviteUsecase {
  constructor(private conviteRepository: IConviteRepository) {}

  async validate(convite: IConvite) {
    const validation = await validate(convite);

    if (validation[0] instanceof ClassValidatorValidationError) {
      const message = _.values(validation[0].constraints)[0];

      const field = validation[0].property;

      throw new ValidationError(message, field);
    }
  }

  async saveImagem(imagem: File) {
    const imagemBuffer = Buffer.from(await imagem.arrayBuffer());
    const filename = `${Date.now()}${imagem.name.replaceAll(" ", "_")}`;

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
        "convite",
        filename
      ),
      imagemBuffer
    );

    return {
      filename,
    };
  }

  async create(params: CreateConviteUsecaseParams) {
    if (!params.imagem || isEmpty(params.imagem.name)) {
      throw new ValidationError(
        "A imagem do Certificado é obrigatória!",
        "imagem"
      );
    }

    const convite = new Convite();

    convite.create({
      ...params,
    });

    await this.validate(convite);

    const { filename } = await this.saveImagem(params.imagem);

    convite.imagem = filename;

    const conviteCreated = await this.conviteRepository.create(convite);

    return conviteCreated;
  }
}

const createConviteService = new CreateConviteService(conviteRepository);

export { createConviteService };
