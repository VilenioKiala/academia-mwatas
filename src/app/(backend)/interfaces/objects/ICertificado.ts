import { ICourse } from "./ICurso";
import { IUser } from "./IUser";

interface ICertificado {
  id?: string;
  imagem: string;
  texto?: string;
  cursoId: string;
  curso: ICourse;
  userId: string;
  usuario: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

export type { ICertificado };
