import { CursoType } from "./Curso";

export type CategoriaType = {
  id: number;
  titulo: string;
  nome: string;
  cursos: CursoType[];
  password: string;
  role: string;
};
