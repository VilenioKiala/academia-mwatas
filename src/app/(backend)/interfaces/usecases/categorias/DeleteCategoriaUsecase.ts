import { ICategoria } from "../../objects/ICategoria";

interface DeleteCategoriaUsecase {
  delete(id: string): Promise<{ categoria: ICategoria; deleted: boolean }>;
}

export type { DeleteCategoriaUsecase };
