import { IsNotEmpty, Max, Min } from "class-validator";
import { IsVideoaulaIdExist } from "../helpers/errors/IsVideoaulaIdExist";
import { IsUserIdExist } from "../helpers/errors/IsUserIdExist";
import { IUser } from "../interfaces/objects/IUser";
import { IAvaliacao } from "../interfaces/objects/IAvaliacao";
import { IVideoAula } from "../interfaces/objects/IVideoAula";

class Avaliacao implements IAvaliacao {
  id?: string;

  @Max(5)
  @Min(0)
  @IsNotEmpty()
  nota: number;

  @IsVideoaulaIdExist()
  @IsNotEmpty()
  videoAulaId: string;

  user: IUser;

  @IsUserIdExist()
  @IsNotEmpty()
  userId: string;

  createdAt?: Date;

  updatedAt?: Date;

  videoAula: IVideoAula;

  assign(params: {
    id?: string;
    nota?: number;
    userId?: string;
    videoAulaId?: string;
  }) {
    Object.assign(this, { ...params });
  }
}

export { Avaliacao };
