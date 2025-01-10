import { IVideoAula } from "../../objects/IVideoAula";

interface GetOneVideoAulaUsecase {
  get(id: string): Promise<IVideoAula>;
}

export type { GetOneVideoAulaUsecase };
