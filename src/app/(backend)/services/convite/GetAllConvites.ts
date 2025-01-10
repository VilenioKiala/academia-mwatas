import { IConviteRepository } from "../../interfaces/repositories/IConviteRepository";
import { GetAllConvitesUsecase } from "../../interfaces/usecases/convites/GetAllConvitesUsecase";
import { conviteRepository } from "../../repositories/MysqlSequelizeRepository/ConviteRepository";

class GetAllConvitesService implements GetAllConvitesUsecase {
  constructor(private conviteRepository: IConviteRepository) {}

  async get(page?: number) {
    const convite = await this.conviteRepository.getAll(page);

    return convite;
  }
}

const getAllConvitesService = new GetAllConvitesService(conviteRepository);

export { getAllConvitesService };
