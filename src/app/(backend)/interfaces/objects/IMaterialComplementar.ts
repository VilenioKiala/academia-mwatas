import { IVideoAula } from "./IVideoAula";

interface IMaterialComplementar {
  id?: string;
  ficheiro: string;
  titulo: string;
  videoaula: IVideoAula;
  videoaulaId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type { IMaterialComplementar };
