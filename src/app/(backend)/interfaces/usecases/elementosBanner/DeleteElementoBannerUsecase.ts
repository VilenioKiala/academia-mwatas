import { IElementoBanner } from "../../objects/IElementoBanner";

interface DeleteElementoBannerUsecase {
  delete(
    id: string
  ): Promise<{ elementoBanner: IElementoBanner; deleted: boolean }>;
}

export type { DeleteElementoBannerUsecase };
