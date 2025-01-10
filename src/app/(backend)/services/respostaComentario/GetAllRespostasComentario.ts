import { IRespostaComentarioRepository } from "../../interfaces/repositories/IRespostaComentarioRepository";
import { GetAllRespostasComentarioUsecase } from "../../interfaces/usecases/respostasComentario/GetAllRespostasComentarioUsecase";
import { respostaComentarioRepository } from "../../repositories/MysqlSequelizeRepository/RespostaComentarioRepository";

class GetAllRespostasComentario implements GetAllRespostasComentarioUsecase {
  constructor(
    private respostaComentarioRepository: IRespostaComentarioRepository
  ) {}

  async get() {
    const respostasComentario =
      await this.respostaComentarioRepository.getAll();

    return respostasComentario;
  }
}

const getAllRespostasComentario = new GetAllRespostasComentario(
  respostaComentarioRepository
);

export { getAllRespostasComentario };
