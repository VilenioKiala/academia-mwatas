import { DeleteMatriculaUsecase } from "../../interfaces/usecases/matriculas/DeleteMatriculaUsecase";
import { IMatriculaRepository } from "../../interfaces/repositories/IMatriculaRepository";
import { matriculaRepository } from "../../repositories/MysqlSequelizeRepository/MatriculaRepository";

class DeleteMatriculaService implements DeleteMatriculaUsecase {
  constructor(private matriculaRepository: IMatriculaRepository) {}

  async delete(id: string) {
    const matricula = await this.matriculaRepository.delete(id);

    return { matricula, deleted: true };
  }
}

const deleteMatriculaService = new DeleteMatriculaService(matriculaRepository);

export { deleteMatriculaService };
