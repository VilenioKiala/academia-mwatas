import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import { GetOneUserUsecase } from "../../interfaces/usecases/user/GetOneUserUsecase";
import { userRepository } from "../../repositories/MysqlSequelizeRepository/UserRepository";

class GetOneUserService implements GetOneUserUsecase {
  constructor(private userRepository: IUserRepository) {}

  async get(id: string) {
    const users = await this.userRepository.getOne(id);

    return users;
  }
}

const getOneUserService = new GetOneUserService(userRepository);

export { getOneUserService };
