import { IElementoBanner } from "../../objects/IElementoBanner";

type CreateElementoBannerParams = {
  photo: File;
  cursoId: string;
};

interface CreateElementoBannerUsecase {
  create(params: CreateElementoBannerParams): Promise<IElementoBanner>;
}

export type { CreateElementoBannerUsecase, CreateElementoBannerParams };
