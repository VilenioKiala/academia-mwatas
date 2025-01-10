import { IMatricula } from "../../objects/IMatricula";

interface DeleteMatriculaUsecase {
  delete(id: string): Promise<{ matricula: IMatricula; deleted: boolean }>;
}

export type { DeleteMatriculaUsecase };
