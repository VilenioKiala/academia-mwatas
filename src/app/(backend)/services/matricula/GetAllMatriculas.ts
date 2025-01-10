import { IMatriculaRepository } from "../../interfaces/repositories/IMatriculaRepository";
import { GetAllMatriculasUsecase } from "../../interfaces/usecases/matriculas/GetAllMatriculasUsecase";
import { matriculaRepository } from "../../repositories/MysqlSequelizeRepository/MatriculaRepository";

class GetAllMatriculasService implements GetAllMatriculasUsecase {
  constructor(private matriculaRepository: IMatriculaRepository) {}

  async get(page?: number, filter?: { userId?: string; cursoId?: string }) {
    const matriculas = await this.matriculaRepository.getAll(page, {
      ...filter,
    });
    console.log(matriculas);

    return matriculas;
  }
}

const getAllMatriculasService = new GetAllMatriculasService(
  matriculaRepository
);

export { getAllMatriculasService };
