import { IUser } from "../../objects/IUser";

type CreateUserUsecaseParams = {
  nome: string;
  sobrenome: string;
  email?: string;
  nomeUsuario: string;
  senha: string;
  repetirSenha: string;
  privilegio: string;
  profilePic?: File;
  emailConfirmado?: boolean;
};

interface CreateUserUsecase {
  create(params: CreateUserUsecaseParams): Promise<IUser>;
}

export type { CreateUserUsecase, CreateUserUsecaseParams };
