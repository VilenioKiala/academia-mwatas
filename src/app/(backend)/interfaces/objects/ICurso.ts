import { ICategoria } from "./ICategoria";
import { IMatricula } from "./IMatricula";
import { IModulo } from "./IModule";

interface ICurso {
  id?: string;
  coverCurso: string;
  categoriaId: string;
  titulo: string;
  fraseDestaque?: string;
  sobreOCurso?: string;
  preco: number;
  modulos?: IModulo[];
  matriculas?: IMatricula[];
  categoria: ICategoria;
  createdAt?: Date;
  updatedAt?: Date;

  assign(params: {
    id?: string;
    titulo?: string;
    sobreOCurso?: string;
    coverCurso?: string;
    preco?: number;
    fraseDestaque?: string;
    categoriaId?: ICategoria;
  }): void;
}

export type { ICurso };
