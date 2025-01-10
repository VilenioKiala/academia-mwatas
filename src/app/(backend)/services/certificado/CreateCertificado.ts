import {
  validate,
  ValidationError as ClassValidatorValidationError,
  isEmpty,
} from "class-validator";
import _ from "lodash";
import { writeFile } from "node:fs/promises";
import path from "path";
import { ValidationError } from "../../helpers/errors/ValidationError";
import { ICertificado } from "../../interfaces/objects/ICertificado";
import { Certificado } from "../../entities/Certificado";
import { ICertificadoRepository } from "../../interfaces/repositories/ICertificadoRepository";
import { certificadoRepository } from "../../repositories/MysqlSequelizeRepository/CertificadoRepository";
import {
  CreateCertificadoParams,
  CreateCertificadoUsecase,
} from "../../interfaces/usecases/certificados/CreateCertificadoUsecase";

class CreateCertificadoService implements CreateCertificadoUsecase {
  constructor(private certificadoRepository: ICertificadoRepository) {}

  async validate(certitficado: ICertificado) {
    const validation = await validate(certitficado);

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
        "certificados",
        filename
      ),
      imagemBuffer
    );

    return {
      filename,
    };
  }

  async create(params: CreateCertificadoParams) {
    if (!params.imagem || isEmpty(params.imagem.name)) {
      throw new ValidationError(
        "A imagem do Certificado é obrigatória!",
        "imagem"
      );
    }

    const certificado = new Certificado();

    certificado.create({
      ...params,
    });

    await this.validate(certificado);

    const { filename } = await this.saveImagem(params.imagem);

    console.log(filename);

    certificado.imagem = filename;

    const certificadoCreated = await this.certificadoRepository.create(
      certificado
    );

    return certificadoCreated;
  }
}

const createCertificadoService = new CreateCertificadoService(
  certificadoRepository
);

export { createCertificadoService };
