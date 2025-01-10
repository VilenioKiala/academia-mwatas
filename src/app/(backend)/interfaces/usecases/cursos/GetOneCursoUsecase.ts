import { ICurso } from "../../objects/ICurso";

interface GetOneCursoUsecase {
  get(id: string): Promise<ICurso>;
}

export type { GetOneCursoUsecase };
