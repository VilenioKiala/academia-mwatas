import { IMatricula } from "../../objects/IMatricula";

interface GetAllMatriculasUsecase {
  get(
    page?: number,
    filter?: { userId?: string; cursoId?: string }
  ): Promise<{ results: IMatricula[]; totalPages: number } | IMatricula[]>;
}

export type { GetAllMatriculasUsecase };
