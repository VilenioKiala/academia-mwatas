import { IConvite } from "../../objects/IConvite";

interface GetOneConviteUsecase {
  get(id: string): Promise<IConvite | null>;
}

export type { GetOneConviteUsecase };
