import { DeleteComentarioUsecase } from "../../interfaces/usecases/comentarios/DeleteComentarioUsecase";
import { IComentarioRepository } from "../../interfaces/repositories/IComentarioRepository";
import { comentarioRepository } from "../../repositories/MysqlSequelizeRepository/ComentarioRepository";

class DeleteComentarioService implements DeleteComentarioUsecase {
  constructor(private comentarioRepository: IComentarioRepository) {}

  async delete(id: string) {
    const comentario = await this.comentarioRepository.delete(id);

    return { comentario, deleted: true };
  }
}

const deleteComentarioService = new DeleteComentarioService(
  comentarioRepository
);

export { deleteComentarioService };
