import { IUser } from "../../objects/IUser";

type LoginUsecaseParams = {
  emailOrNomeUsuario: string;
  senha: string;
};

type LoginUsecareReturn = {
  user: IUser | null;
  logged: boolean;
  message: string;
  token: string;
};

interface LoginUsecase {
  execute({
    emailOrNomeUsuario,
    senha,
  }: LoginUsecaseParams): Promise<LoginUsecareReturn>;
}

export type { LoginUsecase, LoginUsecaseParams, LoginUsecareReturn };
