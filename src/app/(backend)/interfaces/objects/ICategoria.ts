import { ICurso } from "./ICurso";

type CategoriaType = {
  id?: string;
  titulo: string;
  createdAt?: Date;
  updatedAt?: Date;
  cursos?: ICurso[];
};

interface ICategoria {
  id?: string;
  titulo: string;
  createdAt?: Date;
  updatedAt?: Date;
  cursos?: ICurso[];

  assign(params: { titulo: string }): void;
}

export type { ICategoria, CategoriaType };
