import { IVideoAulaRepository } from "../../interfaces/repositories/IVideoAulaRepository";
import { GetAllVideoAulasUsecase } from "../../interfaces/usecases/videoaulas/GetAllVideoAulasUsecase";
import { videoAulaRepository } from "../../repositories/MysqlSequelizeRepository/VideoAulaRepository";

class GetAllVideoAulasService implements GetAllVideoAulasUsecase {
  constructor(private videoaulaRepository: IVideoAulaRepository) {}

  async get(numeroData: number) {
    const videoaulas = await this.videoaulaRepository.getAll(numeroData);

    return videoaulas;
  }
}

const getAllVideoAulasService = new GetAllVideoAulasService(
  videoAulaRepository
);

export { getAllVideoAulasService };
