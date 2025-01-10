import { ICursoRepository } from "../../interfaces/repositories/ICursoRepository";
import { GetOneCursoUsecase } from "../../interfaces/usecases/cursos/GetOneCursoUsecase";
import { cursoRepository } from "../../repositories/MysqlSequelizeRepository/CursoRepository";

class GetOneCursoService implements GetOneCursoUsecase {
  constructor(private cursoRepository: ICursoRepository) {}

  async get(id: string) {
    const courses = await this.cursoRepository.getOne(id);

    return courses;
  }
}

const getOneCursoService = new GetOneCursoService(cursoRepository);

export { getOneCursoService };
