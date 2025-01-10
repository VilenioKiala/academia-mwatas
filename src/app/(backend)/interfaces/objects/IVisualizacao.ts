import { IUser } from "./IUser";
import { IVideoAula } from "./IVideoAula";

type VisualizacaoType = {
  id?: string;
  videoaula: IVideoAula;
  videoaulaId: string;
  user: IUser;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

interface IVisualizacao {
  id?: string;
  videoaula: IVideoAula;
  videoaulaId: string;
  user: IUser;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;

  assign(params: { videoaulaId?: string; userId?: string }): void;
}

export type { IVisualizacao, VisualizacaoType };
