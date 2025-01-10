import {
  validate,
  ValidationError as ClassValidatorValidationError,
  isNotEmpty,
} from "class-validator";
import _ from "lodash";
import { unlink, writeFile } from "node:fs/promises";
import path from "path";
import { ICursoRepository } from "../../interfaces/repositories/ICursoRepository";
import { ICurso } from "../../interfaces/objects/ICurso";
import { ValidationError } from "../../helpers/errors/ValidationError";
import { NotFoundError } from "../../helpers/errors/NotFound";
import {
  UpdateCursoUsecase,
  UpdateCursoUsecaseParams,
} from "../../interfaces/usecases/cursos/UpdateCursoUsecase";
import { cursoRepository } from "../../repositories/MysqlSequelizeRepository/CursoRepository";

class UpdateCursoService implements UpdateCursoUsecase {
  constructor(private cursoRepository: ICursoRepository) {}

  async validateCurso(curso: ICurso) {
    const validation = await validate(curso);

    if (validation[0] instanceof ClassValidatorValidationError) {
      const message = _.values(validation[0].constraints)[0];

      const field = validation[0].property;

      throw new ValidationError(message, field);
    }
  }

  async saveNewCoverCurso(newCoverCurso: File, oldCoverName: string) {
    const newCoverBuffer = Buffer.from(await newCoverCurso.arrayBuffer());
    const newFilename = `${Date.now()}${newCoverCurso.name.replaceAll(
      " ",
      "_"
    )}`;

    console.log(
      `O path é ${path
        .resolve(
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
          oldCoverName
        )
        .toString()}`
    );

    await unlink(
      path.join(
        __dirname,
        "..",
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
        oldCoverName
      )
    );

    await writeFile(
      path.resolve(
        __dirname,
        "..",
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
        newFilename
      ),
      newCoverBuffer
    );

    return {
      newFilename,
    };
  }

  async update(params: UpdateCursoUsecaseParams, cursoId: string) {
    const curso = await this.cursoRepository.getOne(cursoId);
    const oldCoverName = curso.coverCurso;

    if (!curso) {
      throw new NotFoundError("Curso não encontrado", "curso");
    }

    curso.assign({
      ...params,
      coverCurso: undefined,
    });

    await this.validateCurso(curso);

    if (params.coverCurso || isNotEmpty(params.coverCurso)) {
      const { newFilename } = await this.saveNewCoverCurso(
        params.coverCurso,
        oldCoverName
      );

      curso.coverCurso = newFilename;
    }

    const courseUpdated = await this.cursoRepository.update(
      curso,
      params.categoriaId,
      cursoId
    );

    return { curso: courseUpdated, updated: true };
  }
}

const updateCursoService = new UpdateCursoService(cursoRepository);

export { updateCursoService };
