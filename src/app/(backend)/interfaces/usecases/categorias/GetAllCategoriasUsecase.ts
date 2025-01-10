import { ICategoria } from "../../objects/ICategoria";

interface GetAllCategoriasUsecase {
  get(): Promise<ICategoria[]>;
}

export type { GetAllCategoriasUsecase };
