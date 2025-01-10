import { ICurso } from "../../objects/ICurso";

type UpdateCursoUsecaseParams = {
  coverCurso?: File;
  titulo?: string;
  fraseDestaque?: string;
  sobreOCurso?: string;
  categoriaId?: string;
  preco?: number;
};

interface UpdateCursoUsecase {
  update(
    params: UpdateCursoUsecaseParams,
    cursoId: string
  ): Promise<{ curso: ICurso; updated: boolean }>;
}

export type { UpdateCursoUsecase, UpdateCursoUsecaseParams };
