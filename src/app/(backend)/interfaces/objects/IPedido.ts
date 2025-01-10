import { IConvite } from "./IConvite";

export interface IPedido {
  id?: string;
  email: string;
  conviteId: string;
  convite: IConvite;
}
