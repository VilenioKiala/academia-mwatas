import { IsNotEmpty } from "class-validator";
import { IVisualizacao } from "../interfaces/objects/IVisualizacao";
import { IsVideoaulaIdExist } from "../helpers/errors/IsVideoaulaIdExist";
import { IsUserIdExist } from "../helpers/errors/IsUserIdExist";
import { IVideoAula } from "../interfaces/objects/IVideoAula";
import { IUser } from "../interfaces/objects/IUser";

class Visualizacao implements IVisualizacao {
  id?: string;

  videoaula: IVideoAula;

  @IsVideoaulaIdExist()
  @IsNotEmpty()
  videoaulaId: string;

  user: IUser;

  @IsUserIdExist()
  @IsNotEmpty()
  userId: string;

  createdAt?: Date;

  updatedAt?: Date;

  assign(params: { videoaulaId?: string; userId: string }) {
    Object.assign(this, { ...params });
  }
}

export { Visualizacao };
