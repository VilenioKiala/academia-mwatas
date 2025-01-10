import { IVideoAula } from "../objects/IVideoAula";

interface IVideoAulaRepository {
  getAll(numeroData: number): Promise<IVideoAula[]>;
  getOne(id: string): Promise<IVideoAula | null>;
  create(
    videoaula: IVideoAula,
    cursoId: string,
    moduleId: string
  ): Promise<IVideoAula>;
  delete(id: string): Promise<IVideoAula>;
}

export type { IVideoAulaRepository };
