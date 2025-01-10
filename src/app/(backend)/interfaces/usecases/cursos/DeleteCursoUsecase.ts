import { ICurso } from "../../objects/ICurso";

interface DeleteCursoUsecase {
  delete(id: string): Promise<{ curso: ICurso; deleted: boolean }>;
}

export type { DeleteCursoUsecase };
