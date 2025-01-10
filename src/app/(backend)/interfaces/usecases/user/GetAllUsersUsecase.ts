import { IUser } from "../../objects/IUser";

interface GetAllUsersUsecase {
  get(): Promise<IUser[]>;
}

export type { GetAllUsersUsecase };
