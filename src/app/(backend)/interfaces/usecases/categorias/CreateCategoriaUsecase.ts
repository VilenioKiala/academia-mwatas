import { ICategoria } from "../../objects/ICategoria";

type CreateCategoriaUsecaseParams = {
  titulo: string;
};

interface CreateCategoriaUsecase {
  create({ titulo }: CreateCategoriaUsecaseParams): Promise<ICategoria>;
}

export type { CreateCategoriaUsecaseParams, CreateCategoriaUsecase };
