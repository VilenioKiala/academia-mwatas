import {
  validate,
  ValidationError as ClassValidatorValidationError,
  isNotEmpty,
} from "class-validator";
import { courseRepository } from "../../repositories/MysqlSequelizeRepository/CursoRepository";
import _ from "lodash";
import { unlink, writeFile } from "node:fs/promises";
import path from "path";
import { ICourseRepository } from "../../interfaces/repositories/ICursoRepository";
import { ICourse } from "../../interfaces/objects/ICurso";
import { ValidationError } from "../../helpers/errors/ValidationError";
import {
  UpdateCourseUsecase,
  UpdateCourseUsecaseParams,
} from "../../interfaces/usecases/cursos/UpdateCursoUsecase";
import { NotFoundError } from "../../helpers/errors/NotFound";

class UpdateCourseService implements UpdateCourseUsecase {
  constructor(private courseRepository: ICourseRepository) {}

  async validateCourse(course: ICourse) {
    const validation = await validate(course);

    if (validation[0] instanceof ClassValidatorValidationError) {
      const message = _.values(validation[0].constraints)[0];

      const field = validation[0].property;

      throw new ValidationError(message, field);
    }
  }

  async saveNewCourseCover(newCoverCurso: File, oldCoverName: string) {
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

  async update(params: UpdateCourseUsecaseParams, cursoId: string) {
    const course = await this.courseRepository.getOne(cursoId);
    const oldCoverName = course.coverCurso;

    if (!course) {
      throw new NotFoundError("Curso não encontrado", "curso");
    }

    course.assign({
      ...params,
      coverCurso: undefined,
    });

    await this.validateCourse(course);

    if (params.coverCurso || isNotEmpty(params.coverCurso)) {
      const { newFilename } = await this.saveNewCourseCover(
        params.coverCurso,
        oldCoverName
      );

      course.coverCurso = newFilename;
    }

    const courseUpdated = await this.courseRepository.update(
      course,
      params.categoriaId,
      cursoId
    );

    return { curso: courseUpdated, updated: true };
  }
}

const updateCourseService = new UpdateCourseService(courseRepository);

export { updateCourseService };
