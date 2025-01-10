import { IUser } from "../../objects/IUser";

interface DeleteUserUsecase {
  delete(id: string): Promise<{ user: IUser; deleted: boolean }>;
}

export type { DeleteUserUsecase };
