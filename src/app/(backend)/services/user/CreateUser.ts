import {
  validate,
  ValidationError as ClassValidatorValidationError,
  isNotEmpty,
} from "class-validator";
import { userRepository } from "../../repositories/MysqlSequelizeRepository/UserRepository";
import _ from "lodash";
import {
  CreateUserUsecase,
  CreateUserUsecaseParams,
} from "../../interfaces/usecases/user/CreateUserUsecase";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import { ValidationError } from "../../helpers/errors/ValidationError";
import { User } from "../../entities/User";
import { writeFile } from "fs/promises";
import path from "path";
import { IUser } from "../../interfaces/objects/IUser";

class CreateUserService implements CreateUserUsecase {
  constructor(private userRepository: IUserRepository) {}

  async validateUser(user: IUser) {
    const validation = await validate(user);

    if (validation[0] instanceof ClassValidatorValidationError) {
      const message = _.values(validation[0].constraints)[0];

      const field = validation[0].property;

      throw new ValidationError(message, field);
    }

    if (user.numeroTelefone) {
      if (!user.hasValidNumeroTelefone()) {
        throw new ValidationError(
          "Número de Telefone Inválido",
          "numeroTelefone"
        );
      }
    }
  }

  async saveProfilePic(profilePic: File) {
    const profilePicBuffer = Buffer.from(await profilePic.arrayBuffer());
    const filename = `${Date.now()}${profilePic.name.replaceAll(" ", "_")}`;

    console.log(filename);

    await writeFile(
      path.resolve(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "..",
        "..",
        "public",
        "storage",
        "images",
        "profile_pic",
        filename
      ),
      profilePicBuffer
    );

    return {
      filename,
    };
  }

  verifyRepeatedPassword(repetir_password: string, password: string) {
    if (repetir_password !== password) {
      throw new ValidationError(
        "A senha não corresponde a original!",
        "repetirSenha"
      );
    }
  }

  async create(params: CreateUserUsecaseParams) {
    const user = new User();

    user.assign({ ...params });

    await this.validateUser(user);

    this.verifyRepeatedPassword(params.repetirSenha, params.senha);

    await user.verifyUserWithTheSameEmail();

    await user.verifyUserWithTheSameUsername();

    if (params.profilePic || isNotEmpty(params.profilePic)) {
      const { filename } = await this.saveProfilePic(params.profilePic);

      user.profilePic = filename;
    }

    user.encryptPassword();

    const userCreated = await this.userRepository.create(user);

    console.log("usuario criado", userCreated);

    return userCreated;
  }
}

const createUserService = new CreateUserService(userRepository);

export { createUserService };
