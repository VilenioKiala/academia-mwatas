import { IConviteRepository } from "../../interfaces/repositories/IConviteRepository";
import { GetOneConviteUsecase } from "../../interfaces/usecases/convites/GetOneConviteUsecase";
import { conviteRepository } from "../../repositories/MysqlSequelizeRepository/ConviteRepository";

class GetOneConviteService implements GetOneConviteUsecase {
  constructor(private conviteRepository: IConviteRepository) {}

  get(id: string) {
    const convite = this.conviteRepository.getOne(id);

    return convite;
  }
}

const getOneConviteService = new GetOneConviteService(conviteRepository);

export { getOneConviteService };
