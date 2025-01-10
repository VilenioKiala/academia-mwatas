import { IElementoBanner } from "../objects/IElementoBanner";

interface IElementoBannerRepository {
  getAll(): Promise<IElementoBanner[]>;
  getOne(id: string): Promise<IElementoBanner | null>;
  create(
    elementoBanner: IElementoBanner,
    cursoId: string
  ): Promise<IElementoBanner>;
  delete(id: string): Promise<IElementoBanner>;
}

export type { IElementoBannerRepository };
