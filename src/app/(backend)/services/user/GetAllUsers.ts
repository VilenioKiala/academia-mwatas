import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import { GetAllUsersUsecase } from "../../interfaces/usecases/user/GetAllUsersUsecase";
import { userRepository } from "../../repositories/MysqlSequelizeRepository/UserRepository";

class GetAllUsersService implements GetAllUsersUsecase {
  constructor(private userRepository: IUserRepository) {}

  async get() {
    const users = await this.userRepository.getAll();
    console.log(users);

    return users;
  }
}

const getAllUsersService = new GetAllUsersService(userRepository);

export { getAllUsersService };
