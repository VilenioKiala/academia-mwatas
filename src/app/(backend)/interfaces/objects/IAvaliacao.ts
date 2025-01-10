import { IUser } from "./IUser";
import { IVideoAula } from "./IVideoAula";

interface IAvaliacao {
  id?: string;
  nota: number;
  videoAula: IVideoAula;
  videoAulaId: string;
  user: IUser;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;

  assign(params: {
    id?: string;
    nota?: number;
    userId?: string;
    videoAulaId?: string;
  }): void;
}

export type { IAvaliacao };
