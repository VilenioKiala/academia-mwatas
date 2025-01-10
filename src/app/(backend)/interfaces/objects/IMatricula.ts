import { ICurso } from "./ICurso";
import { IUser } from "./IUser";

interface IMatricula {
  id?: string;
  dataExpiracao: Date;
  userId: string;
  usuario?: IUser;
  cursoId: string;
  curso?: ICurso;
  createdAt?: Date;
  updatedAt?: Date;

  assign(params: {
    id?: string;
    userId?: string;
    cursoId?: string;
    dataExpiracao?: Date;
  }): void;
}

export type { IMatricula };
