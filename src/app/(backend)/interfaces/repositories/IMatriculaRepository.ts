import { IMatricula } from "../objects/IMatricula";

interface IMatriculaRepository {
  getAll(
    page?: number,
    filter?: { userId?: string; cursoId?: string }
  ): Promise<{ results: IMatricula[]; totalPages: number } | IMatricula[]>;
  getOne(id: string): Promise<IMatricula | null>;
  getOneFromCursoAndUser(
    cursoId: string,
    userId: string
  ): Promise<IMatricula | null>;
  create(matricula: IMatricula): Promise<IMatricula>;
  update(matricula: IMatricula): Promise<IMatricula>;
  delete(id: string): Promise<IMatricula>;
}

export type { IMatriculaRepository };
