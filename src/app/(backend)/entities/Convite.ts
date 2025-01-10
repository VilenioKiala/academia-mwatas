import { IsNotEmpty, Length } from "class-validator";
import { IUser } from "../interfaces/objects/IUser";
import { IConvite } from "../interfaces/objects/IConvite";
import { IPedido } from "../interfaces/objects/IPedido";

class Convite implements IConvite {
  id?: string;

  imagem: string;

  @Length(0, 500)
  @IsNotEmpty()
  textoDestaque: string;

  @Length(0, 500)
  @IsNotEmpty()
  textoChamada: string;

  usuarios: IUser[];

  pedidos: IPedido[];

  createdAt?: Date;

  updatedAt?: Date;

  create(params: {
    id?: string;
    textoDestaque?: string;
    textoChamada?: string;
  }) {
    Object.assign(this, { ...params });
  }
}

export { Convite };
