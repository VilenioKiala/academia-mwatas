import { ICurso } from "../interfaces/objects/ICurso";
import { IElementoBanner } from "../interfaces/objects/IElementoBanner";

class ElementoBanner implements IElementoBanner {
  id?: string;
  photo: string;
  curso?: ICurso;
  cursoId?: string;
  link?: string;

  create(params: {
    id?: string;
    photo?: string;
    cursoId?: string;
    link?: string;
  }) {
    Object.assign(this, { ...params });
  }
}

export { ElementoBanner };
