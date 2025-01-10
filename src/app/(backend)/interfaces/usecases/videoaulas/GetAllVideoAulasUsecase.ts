import { IVideoAula } from "../../objects/IVideoAula";

interface GetAllVideoAulasUsecase {
  get(numeroData: number): Promise<IVideoAula[]>;
}

export type { GetAllVideoAulasUsecase };
