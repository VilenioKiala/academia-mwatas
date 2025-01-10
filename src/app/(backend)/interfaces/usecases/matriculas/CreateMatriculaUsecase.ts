import { IMatricula } from "../../objects/IMatricula";

type CreateMatriculaUsecaseParams = {
  dataExpiracao: Date;
  userId: string;
  cursoId: string;
};

interface CreateMatriculaUsecase {
  create(params: CreateMatriculaUsecaseParams): Promise<IMatricula>;
}

export type { CreateMatriculaUsecase, CreateMatriculaUsecaseParams };
