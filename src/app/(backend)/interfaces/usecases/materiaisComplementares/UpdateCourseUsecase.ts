import { ICourse } from "../../objects/ICurso";

type UpdateCourseUsecaseParams = {
  coverCurso?: File;
  titulo?: string;
  fraseDestaque?: string;
  sobreOCurso?: string;
  categoriaId?: string;
  preco?: number;
};

interface UpdateCourseUsecase {
  update(
    params: UpdateCourseUsecaseParams,
    cursoId: string
  ): Promise<{ curso: ICourse; updated: boolean }>;
}

export type { UpdateCourseUsecase, UpdateCourseUsecaseParams };
