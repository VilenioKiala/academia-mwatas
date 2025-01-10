import { ICourseRepository } from "../../interfaces/repositories/ICursoRepository";
import { GetOneCourseUsecase } from "../../interfaces/usecases/cursos/GetOneCursoUsecase";
import { courseRepository } from "../../repositories/MysqlSequelizeRepository/CursoRepository";

class GetOneCourseService implements GetOneCourseUsecase {
  constructor(private courseRepository: ICourseRepository) {}

  async get(id: string) {
    const courses = await this.courseRepository.getOne(id);

    return courses;
  }
}

const getOneCourseService = new GetOneCourseService(courseRepository);

export { getOneCourseService };
