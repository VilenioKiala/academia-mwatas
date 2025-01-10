import { isEmpty } from "validator";
import { userRepository } from "../../repositories/MysqlSequelizeRepository/UserRepository";
import { isEmail } from "class-validator";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import {
  LoginUsecase,
  LoginUsecaseParams,
} from "../../interfaces/usecases/auth/LoginUsecase";
import { ValidationError } from "../../helpers/errors/ValidationError";
import { AuthenticationError } from "../../helpers/errors/AuthenticationError";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secretKey = process.env.SESSION_SECRET;

class LoginService implements LoginUsecase {
  constructor(private userRepository: IUserRepository) {}

  validateData(email: string, senha: string) {
    if (isEmpty(email)) {
      throw new ValidationError("O Email é Obrigatório!", "email");
    }

    if (isEmpty(senha)) {
      throw new ValidationError("A Senha é Obrigatória!", "senha");
    }

    if (!isEmail(email)) {
      throw new ValidationError("Email inválido", "email");
    }
  }

  async execute({ emailOrNomeUsuario, senha }: LoginUsecaseParams) {
    let user;
    const userByEmail = await this.userRepository.getOneByEmail(
      emailOrNomeUsuario
    );
    const userByUsername = await this.userRepository.getOneByUsername(
      emailOrNomeUsuario
    );

    this.validateData(emailOrNomeUsuario, senha);

    if (!userByEmail && !userByUsername) {
      throw new AuthenticationError("Usuário ou Senha incorreto!");
    }

    if (userByEmail && !userByUsername) {
      user = userByEmail;
    }

    if (userByUsername && !userByEmail) {
      user = userByEmail;
    }

    if (userByUsername && userByEmail) {
      user = userByEmail;
    }

    const isPasswordCorrect = bcrypt.compareSync(senha, user.senha);

    if (!isPasswordCorrect) {
      throw new AuthenticationError("Usuário ou Senha incorreto!");
    }

    const token = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      algorithm: "HS256",
    });

    return {
      user,
      logged: true,
      message: "Login Efectuado com sucesso!",
      token: token,
    };
  }
}

const loginService = new LoginService(userRepository);

export { loginService };
