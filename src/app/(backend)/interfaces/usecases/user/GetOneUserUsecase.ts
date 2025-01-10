import { IUser } from "../../objects/IUser";

interface GetOneUserUsecase {
  get(id: string): Promise<IUser>;
}

export type { GetOneUserUsecase };
