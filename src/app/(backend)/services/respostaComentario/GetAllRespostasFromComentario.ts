import { IRespostaComentarioRepository } from "../../interfaces/repositories/IRespostaComentarioRepository";
import { GetRespostasFromComentarioUsecase } from "../../interfaces/usecases/respostasComentario/GetRespostasFromComentarioUsecase";
import { respostaComentarioRepository } from "../../repositories/MysqlSequelizeRepository/RespostaComentarioRepository";

class GetAllRespostasFromComentario
  implements GetRespostasFromComentarioUsecase
{
  constructor(
    private respostaComentarioRepository: IRespostaComentarioRepository
  ) {}

  async get(comentarioId: string) {
    const respostasComentario =
      await this.respostaComentarioRepository.getAllRespostasFromComentario(
        comentarioId
      );

    return respostasComentario;
  }
}

const getAllRespostasFromComentario = new GetAllRespostasFromComentario(
  respostaComentarioRepository
);

export { getAllRespostasFromComentario };
