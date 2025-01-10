import { IConviteRepository } from "../../interfaces/repositories/IConviteRepository";
import { DeleteConviteUsecase } from "../../interfaces/usecases/convites/DeleteConviteUsecase";
import { conviteRepository } from "../../repositories/MysqlSequelizeRepository/ConviteRepository";

class DeleteConviteService implements DeleteConviteUsecase {
  constructor(private conviteRepository: IConviteRepository) {}

  async delete(id: string) {
    const convite = await this.conviteRepository.delete(id);

    return { convite, deleted: true };
  }
}

const deleteConviteService = new DeleteConviteService(conviteRepository);

export { deleteConviteService };
