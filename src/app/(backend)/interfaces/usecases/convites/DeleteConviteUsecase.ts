import { IConvite } from "../../objects/IConvite";

interface DeleteConviteUsecase {
  delete(id: string): Promise<{ convite: IConvite; deleted: boolean }>;
}

export type { DeleteConviteUsecase };
