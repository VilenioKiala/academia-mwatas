import { ICursoRepository } from "../../interfaces/repositories/ICursoRepository";
import { GetAllCursosUsecase } from "../../interfaces/usecases/cursos/GetAllCursosUsecase";
import { cursoRepository } from "../../repositories/MysqlSequelizeRepository/CursoRepository";

class GetAllCursosService implements GetAllCursosUsecase {
  constructor(private cursoRepository: ICursoRepository) {}

  async get() {
    const cursos = await this.cursoRepository.getAll();

    return cursos;
  }
}

const getAllCursosService = new GetAllCursosService(cursoRepository);

export { getAllCursosService };
