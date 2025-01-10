import { IElementoBanner } from "../../objects/IElementoBanner";

interface GetAllElementosBannerUsecase {
  get(): Promise<IElementoBanner[]>;
}

export type { GetAllElementosBannerUsecase };
