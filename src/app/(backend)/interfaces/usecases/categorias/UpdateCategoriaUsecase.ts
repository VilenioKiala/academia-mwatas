import { ICategoria } from "../../objects/ICategoria";

type UpdateCategoriaUsecaseParams = {
  titulo?: string;
};

interface UpdateCategoriaUsecase {
  update(
    params: UpdateCategoriaUsecaseParams,
    categoriaId: string
  ): Promise<{ categoria: ICategoria; updated: boolean }>;
}

export type { UpdateCategoriaUsecase, UpdateCategoriaUsecaseParams };
