import { IUser } from "../objects/IUser";

type UserFilterParams = {
  privilegio?: string;
  assinantes?: boolean;
  cursoIdMatriculado?: string;
  query?: string;
};

type CreateUserRepositoryParams = {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
};

interface IUserRepository {
  getAll(): Promise<IUser[]>;
  getUsersWithPaginationAndFilter(
    page?: number,
    usersPerPage?: number,
    filter?: UserFilterParams
  ): Promise<{ results: IUser[]; totalPages: number }>;
  getOne(id: string): Promise<IUser | null>;
  getOneByEmail(email: string): Promise<IUser | null>;
  getOneByUsername(username: string): Promise<IUser | null>;
  create(user: IUser): Promise<IUser>;
  update(user: IUser): Promise<IUser>;
  delete(id: string): Promise<IUser>;
  removerFotoPerfil(id: string): Promise<void>;
}

export type { IUserRepository, CreateUserRepositoryParams, UserFilterParams };
