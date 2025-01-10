import { IVideoAulaRepository } from "../../interfaces/repositories/IVideoAulaRepository";
import { GetOneVideoAulaUsecase } from "../../interfaces/usecases/videoaulas/GetOneVideoAulaUsecase";
import { videoAulaRepository } from "../../repositories/MysqlSequelizeRepository/VideoAulaRepository";

class GetOneVideoAulaService implements GetOneVideoAulaUsecase {
  constructor(private videoaulaRepository: IVideoAulaRepository) {}

  async get(id: string) {
    const videoaula = await this.videoaulaRepository.getOne(id);

    return videoaula;
  }
}

const getOneVideoAulaService = new GetOneVideoAulaService(videoAulaRepository);

export { getOneVideoAulaService };
