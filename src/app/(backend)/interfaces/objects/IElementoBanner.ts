import { ICourse } from "./ICurso";

export interface IElementoBanner {
  id?: string;
  photo: string;
  link?: string;
  cursoId?: string;
  curso?: ICourse;
}
