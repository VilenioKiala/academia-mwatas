import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Length,
  matches,
  Matches,
} from "class-validator";
import { IUser } from "../interfaces/objects/IUser";
import { userRepository } from "../repositories/MysqlSequelizeRepository/UserRepository";
import { ValidationError } from "../helpers/errors/ValidationError";
import { ICertificado } from "../interfaces/objects/ICertificado";
import bcrypt from "bcryptjs";
import { IMatricula } from "../interfaces/objects/IMatricula";

enum privilegios {
  Admin = "admin",
  Aluno = "aluno",
  Professor = "professor",
}

class User implements IUser {
  id?: string;
  emailConfirmado: boolean;
  profilePic?: File | string;

  @IsNotEmpty()
  @Length(2, 30)
  nome: string;

  @IsNotEmpty()
  @Length(2, 30)
  sobrenome: string;

  @IsEmail({}, { message: "O email digitado não é um email válido!" })
  email: string;

  @IsNotEmpty()
  @Matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/)
  nomeUsuario: string;

  @IsNotEmpty()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/)
  senha: string;

  @IsNotEmpty()
  @IsEnum(privilegios)
  privilegio: string;

  bloqueado: boolean;
  dataNascimento?: Date;
  genero?: string;
  sobre?: string;
  numeroTelefone?: string;
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
  }) {
    Object.assign(this, { ...params });
  }

  async verifyUserWithTheSameEmail() {
    const user = await userRepository.getOneByEmail(this.email);

    if (user !== null) {
      throw new ValidationError(
        "Já existe um usuário com este email!",
        "email"
      );
    }
  }

  async verifyUserWithTheSameUsername() {
    const user = await userRepository.getOneByUsername(this.nomeUsuario);

    if (user !== null) {
      throw new ValidationError(
        "Já existe um usuário com este nome de usuário!",
        "nomeUsuario"
      );
    }
  }

  encryptPassword() {
    const hash = bcrypt.hashSync(this.senha, 8);

    this.senha = hash.toString();
  }

  hasValidNumeroTelefone() {
    return matches(this.numeroTelefone, /^(9[0-9]{8})?$/);
  }
}

export { User };
