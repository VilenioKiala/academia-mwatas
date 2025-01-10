import { ICategoria } from "../objects/ICategoria";

interface ICategoriaRepository {
  getAll(): Promise<ICategoria[]>;
  getOne(id: string): Promise<ICategoria | null>;
  create(categoria: ICategoria): Promise<ICategoria>;
  update(categoria: ICategoria, categoriaId: string): Promise<ICategoria>;
  delete(id: string): Promise<ICategoria>;
}

export type { ICategoriaRepository };
