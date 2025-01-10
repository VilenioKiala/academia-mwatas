import { IConvite } from "../../objects/IConvite";

interface GetAllConvitesUsecase {
  get(
    page?: number
  ): Promise<{ results: IConvite[]; totalPages: number } | IConvite[]>;
}

export type { GetAllConvitesUsecase };
