import { IUser } from "../../objects/IUser";
import { UserFilterParams } from "../../repositories/IUserRepository";

type GetUsersWithFilterAndPaginationUsecaseParams = {
  page?: number;
  usersPerPage?: number;
  take?: number;
  filter?: UserFilterParams;
};

interface GetUsersWithFilterAndPaginationUsecase {
  get(
    param: GetUsersWithFilterAndPaginationUsecaseParams
  ): Promise<{ results: IUser[]; totalPages: number }>;
}

export type {
  GetUsersWithFilterAndPaginationUsecase,
  GetUsersWithFilterAndPaginationUsecaseParams,
};
