import { IUser } from "./IUser";

interface ICommentResponse {
  id?: string;
  usuario: IUser;
  texto: string;
}

export type { ICommentResponse };
