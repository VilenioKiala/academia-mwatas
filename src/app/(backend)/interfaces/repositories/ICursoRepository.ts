import { ICurso } from "../objects/ICurso";

type CursoFilterParams = {
  categoriaId?: string;
  disponibilidade?: string;
  query?: string;
};

interface ICursoRepository {
  getAll(): Promise<ICurso[]>;
  getCursosWithPaginationAndFilter(
    page?: number,
    cursosPerPage?: number,
    filter?: CursoFilterParams
  ): Promise<{ results: ICurso[]; totalPages: number }>;
  getOne(id: string): Promise<ICurso | null>;
  create(course: ICurso, categoriaId: string): Promise<ICurso>;
  update(
    course: ICurso,
    courseId: string,
    categoriaId?: string
  ): Promise<ICurso>;
  delete(id: string): Promise<ICurso>;
}

export type { ICursoRepository, CursoFilterParams };
