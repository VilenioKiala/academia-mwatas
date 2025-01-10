import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import {
  GetUsersWithFilterAndPaginationUsecase,
  GetUsersWithFilterAndPaginationUsecaseParams,
} from "../../interfaces/usecases/user/GetUsersWithFilterAndPagination";
import { userRepository } from "../../repositories/MysqlSequelizeRepository/UserRepository";

class GetUsersWithPaginationAndFilterService
  implements GetUsersWithFilterAndPaginationUsecase
{
  constructor(private userRepository: IUserRepository) {}

  async get(param: GetUsersWithFilterAndPaginationUsecaseParams) {
    console.log("params get", param);
    const users = await this.userRepository.getUsersWithPaginationAndFilter(
      param.page,
      param.usersPerPage,
      {
        cursoIdMatriculado: param.filter.cursoIdMatriculado,
        query: param.filter.query,
        assinantes: param.filter.assinantes,
        privilegio: param.filter.privilegio,
      }
    );

    return users;
  }
}

const getUsersWithPaginationAndFilterService =
  new GetUsersWithPaginationAndFilterService(userRepository);

export { getUsersWithPaginationAndFilterService };
