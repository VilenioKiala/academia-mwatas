import { IPedido } from "./IPedido";
import { IUser } from "./IUser";

export interface IConvite {
  id?: string;
  imagem: string;
  textoDestaque: string;
  textoChamada: string;
  usuarios: IUser[];
  pedidos: IPedido[];
  createdAt?: Date;
  updatedAt?: Date;
}
