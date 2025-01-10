import { ICategory } from "../../objects/ICategoria";

interface GetOneCategoryUsecase {
  get(id: string): Promise<ICategory | null>;
}

export type { GetOneCategoryUsecase };
