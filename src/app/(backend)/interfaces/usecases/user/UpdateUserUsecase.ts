import { IUser } from "../../objects/IUser";

type UpdateUserUsecaseParams = {
  id: string;
  profilePic?: File;
  nome?: string;
  sobrenome?: string;
  nomeUsuario?: string;
  email?: string;
  privilegio?: string;
  bloqueado?: boolean;
  dataNascimento?: Date;
  numeroTelefone?: string;
  genero?: string;
  sobre?: string;
  senha?: string;
  repetirSenha?: string;
};

interface UpdateUserUsecase {
  update(
    params: UpdateUserUsecaseParams
  ): Promise<{ user: IUser; updated: boolean }>;
}

export type { UpdateUserUsecase, UpdateUserUsecaseParams };
