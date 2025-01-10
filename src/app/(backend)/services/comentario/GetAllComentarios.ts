import { IComentarioRepository } from "../../interfaces/repositories/IComentarioRepository";
import {
  GetAllComentariosUsecase,
  GetAllComentariosUsecaseParams,
} from "../../interfaces/usecases/comentarios/GetAllComentariosUsecase";
import { comentarioRepository } from "../../repositories/MysqlSequelizeRepository/ComentarioRepository";

class GetAllComentariosService implements GetAllComentariosUsecase {
  constructor(private comentarioRepository: IComentarioRepository) {}

  async get(filter?: GetAllComentariosUsecaseParams) {
    const comentarios = await this.comentarioRepository.getAll(filter);

    return comentarios;
  }
}

const getAllComentariosService = new GetAllComentariosService(
  comentarioRepository
);

export { getAllComentariosService };
