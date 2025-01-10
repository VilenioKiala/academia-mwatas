import { unlink } from "fs/promises";
import path from "path";
import { DeleteCursoUsecase } from "../../interfaces/usecases/cursos/DeleteCursoUsecase";
import { ICursoRepository } from "../../interfaces/repositories/ICursoRepository";
import { cursoRepository } from "../../repositories/MysqlSequelizeRepository/CursoRepository";

class DeleteCursoService implements DeleteCursoUsecase {
  constructor(private cursoRepository: ICursoRepository) {}

  async deleteCoverFile(coverName: string) {
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
        coverName
      )
    );
  }

  async delete(id: string) {
    const curso = await this.cursoRepository.delete(id);

    await this.deleteCoverFile(curso.coverCurso);

    return { curso, deleted: true };
  }
}

const deleteCursoService = new DeleteCursoService(cursoRepository);

export { deleteCursoService };
