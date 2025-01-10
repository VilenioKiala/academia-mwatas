import { ICurso } from "../../objects/ICurso";

interface GetAllCursosUsecase {
  get(): Promise<ICurso[]>;
}

export type { GetAllCursosUsecase };
