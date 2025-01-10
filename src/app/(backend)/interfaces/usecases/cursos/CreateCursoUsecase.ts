import { ICurso } from "../../objects/ICurso";

type CreateCursoParams = {
  coverCurso: File;
  titulo: string;
  fraseDestaque?: string;
  sobreOCurso?: string;
  categoriaId: string;
  preco: number;
};

interface CreateCursoUsecase {
  create(params: CreateCursoParams): Promise<ICurso>;
}

export type { CreateCursoUsecase, CreateCursoParams };
