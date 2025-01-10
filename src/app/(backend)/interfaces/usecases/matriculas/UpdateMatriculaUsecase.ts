import { IMatricula } from "../../objects/IMatricula";

type UpdateMatriculaUsecaseParams = {
  dataExpiracao?: Date;
  id?: string;
  cursoId?: string;
  userId?: string;
};

interface UpdateMatriculaUsecase {
  update(
    params: UpdateMatriculaUsecaseParams
  ): Promise<{ matricula: IMatricula; updated: boolean }>;
}

export type { UpdateMatriculaUsecase, UpdateMatriculaUsecaseParams };
