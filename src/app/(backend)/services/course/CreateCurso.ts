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
  CreateCursoParams,
  CreateCursoUsecase,
} from "../../interfaces/usecases/cursos/CreateCursoUsecase";
import { cursoRepository } from "../../repositories/MysqlSequelizeRepository/CursoRepository";
import { Curso } from "../../entities/Curso";
import { ICursoRepository } from "../../interfaces/repositories/ICursoRepository";
import { ICurso } from "../../interfaces/objects/ICurso";

class CreateCursoService implements CreateCursoUsecase {
  constructor(private cursoRepository: ICursoRepository) {}

  async validateCurso(curso: ICurso) {
    const validation = await validate(curso);

    if (validation[0] instanceof ClassValidatorValidationError) {
      const message = _.values(validation[0].constraints)[0];

      const field = validation[0].property;

      throw new ValidationError(message, field);
    }
  }

  async saveCoverCurso(cover_curso: File) {
    const coverBuffer = Buffer.from(await cover_curso.arrayBuffer());
    const filename = `${Date.now()}${cover_curso.name.replaceAll(" ", "_")}`;

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
        "cover_curso",
        filename
      ),
      coverBuffer
    );

    return {
      filename,
    };
  }

  async create(params: CreateCursoParams) {
    if (!params.coverCurso || isEmpty(params.coverCurso.name)) {
      throw new ValidationError(
        "A imagem do Curso é obrigatória!",
        "cover_curso"
      );
    }

    const curso = new Curso();

    curso.assign({
      ...params,
      coverCurso: undefined,
    });

    await this.validateCurso(curso);

    const { filename } = await this.saveCoverCurso(params.coverCurso);

    console.log(filename);

    curso.coverCurso = filename;

    const cursoCreated = await this.cursoRepository.create(
      curso,
      params.categoriaId
    );

    return cursoCreated;
  }
}

const createCursoService = new CreateCursoService(cursoRepository);

export { createCursoService };
