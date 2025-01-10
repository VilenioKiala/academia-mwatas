import { ICertificado } from "./ICertificado";
import { IMatricula } from "./IMatricula";

type UserType = {
  id?: string;
  profilePic?: string;
  nome: string;
  sobrenome: string;
  email: string;
  nomeUsuario: string;
  privilegio: string;
  bloqueado: boolean;
  dataNascimento?: Date;
  genero?: string;
  sobre?: string;
  senha: string;
  repetirSenha?: string;
  matriculas?: IMatricula[];
  createdAt?: Date;
  updatedAt?: Date;
};

interface IUser {
  id?: string;
  profilePic?: File | string;
  nome: string;
  sobrenome: string;
  emailConfirmado: boolean;
  email: string;
  nomeUsuario: string;
  privilegio: string;
  bloqueado: boolean;
  dataNascimento?: Date;
  genero?: string;
  sobre?: string;
  numeroTelefone?: string;
  senha: string;
  repetirSenha?: string;
  createdAt?: Date;
  updatedAt?: Date;
  conviteId?: string;
  certificados?: ICertificado[];
  matriculas?: IMatricula[];

  assign(params: {
    id?: string;
    nome?: string;
    sobrenome?: string;
    email?: string;
    emailConfirmado?: boolean;
    nomeUsuario?: string;
    senha?: string;
    repetirSenhas?: string;
    privilegio?: string;
    profilePic?: File | string;
    conviteId?: string;
  }): void;

  verifyUserWithTheSameEmail(): Promise<void>;
  verifyUserWithTheSameUsername(): Promise<void>;
  encryptPassword(): void;
  hasValidNumeroTelefone(): boolean;
}

export type { IUser, UserType };
