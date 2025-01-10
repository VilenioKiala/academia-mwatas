import { ICurso } from "./ICurso";
import { IVideoAula } from "./IVideoAula";

interface IModulo {
  id?: string;
  titulo: string;
  curso: ICurso;
  videoAulas?: IVideoAula[];
  cursoId: string;
}

export type { IModulo };
