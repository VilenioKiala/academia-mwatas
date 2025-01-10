import { ICategoria } from "../../objects/ICategoria";

interface GetOneCategoriaUsecase {
  get(id: string): Promise<ICategoria | null>;
}

export type { GetOneCategoriaUsecase };
