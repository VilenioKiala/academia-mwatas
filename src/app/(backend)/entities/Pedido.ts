import { IsNotEmpty } from "class-validator";
import { IPedido } from "../interfaces/objects/IPedido";
import { IConvite } from "../interfaces/objects/IConvite";
import { IsConviteIdExist } from "../helpers/errors/IsConviteIdExist";

class Pedido implements IPedido {
  id?: string;

  email: string;

  convite: IConvite;

  @IsConviteIdExist()
  @IsNotEmpty()
  conviteId: string;

  createdAt?: Date;

  updatedAt?: Date;

  create(params: {
    id?: string;
    texto?: string;
    cursoId?: string;
    userId?: string;
  }) {
    Object.assign(this, { ...params });
  }
}

export { Pedido };
