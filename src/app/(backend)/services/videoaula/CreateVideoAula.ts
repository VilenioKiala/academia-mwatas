import { validate } from "class-validator";
import { ValidationError as ClassValidatorValidationError } from "class-validator";
import _ from "lodash";
import { writeFile } from "node:fs/promises";
import path from "path";
import { videoAulaRepository } from "../../repositories/MysqlSequelizeRepository/VideoAulaRepository";
import { moduleRepository } from "../../repositories/MysqlSequelizeRepository/ModuleRepository";
import {
  CreateVideoAulaParams,
  CreateVideoAulaUsecase,
} from "../../interfaces/usecases/videoaulas/CreateVideoAulaUsecase";
import { IVideoAulaRepository } from "../../interfaces/repositories/IVideoAulaRepository";
import { IModuleRepository } from "../../interfaces/repositories/IModuleRepository";
import { IVideoAula } from "../../interfaces/objects/IVideoAula";
import { ValidationError } from "../../helpers/errors/ValidationError";
import { VideoAula } from "../../entities/VideoAula";

class CreateVideoAulaService implements CreateVideoAulaUsecase {
  constructor(
    private videoaulaRepository: IVideoAulaRepository,
    private moduleRepository: IModuleRepository
  ) {}

  async validateVideoAula(videoaula: IVideoAula) {
    const validation = await validate(videoaula);

    if (validation[0] instanceof ClassValidatorValidationError) {
      const message = _.values(validation[0].constraints)[0];

      const field = validation[0].property;

      throw new ValidationError(message, field);
    }
  }

  async saveVideo(video: File) {
    if (video.type !== "video/mp4") {
      throw new ValidationError(
        "Formato não suportado! O vídeo deve ser ter o formato mp4",
        "video"
      );
    }

    const videoBuffer = Buffer.from(await video.arrayBuffer());
    const filename = `${Date.now()}${video.name.replaceAll(" ", "_")}`;

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
        "videoaulas",
        filename
      ),
      videoBuffer
    );

    return {
      filename,
    };
  }

  async create(params: CreateVideoAulaParams) {
    const modulo = await this.moduleRepository.getOne(params.moduloId);

    if (!modulo) {
      throw new ValidationError(
        "Não existe este módulo que pretende criar a video aula",
        ""
      );
    }

    if (!params.video) {
      throw new ValidationError("O vídeo é obrigatória!", "video");
    }

    const videoaula = new VideoAula();

    const { filename } = await this.saveVideo(params.video);

    videoaula.create({
      ...params,
      video: filename,
    });

    await this.validateVideoAula(videoaula);

    console.log({
      videoaula,
      moduloId: params.moduloId,
    });

    const videoaulaCreated = await this.videoaulaRepository.create(
      videoaula,
      params.moduloId,
      modulo.cursoId
    );

    return videoaulaCreated;
  }
}

const createVideoAulaService = new CreateVideoAulaService(
  videoAulaRepository,
  moduleRepository
);

export { createVideoAulaService };
