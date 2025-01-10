import { IsNotEmpty, Length } from "class-validator";
import { IMaterialComplementar } from "../interfaces/objects/IMaterialComplementar";
import { IVideoAula } from "../interfaces/objects/IVideoAula";
import { IsVideoaulaIdExist } from "../helpers/errors/IsVideoaulaIdExist";

class MaterialComplementar implements IMaterialComplementar {
  id?: string;

  @Length(1, 100)
  @IsNotEmpty()
  titulo: string;

  ficheiro: string;

  videoaula: IVideoAula;

  @IsVideoaulaIdExist()
  @IsNotEmpty()
  videoaulaId: string;

  createdAt?: Date;

  updatedAt?: Date;

  assign(params: {
    id?: string;
    titulo?: string;
    ficheiro?: string;
    videoaulaId?: string;
  }) {
    Object.assign(this, { ...params });
  }
}

export { MaterialComplementar };
