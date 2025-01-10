import {
  validate,
  ValidationError as ClassValidatorValidationError,
  isNotEmpty,
} from "class-validator";
import _ from "lodash";
import { unlink, writeFile } from "node:fs/promises";
import path from "path";
import { ValidationError } from "../../helpers/errors/ValidationError";
import { NotFoundError } from "../../helpers/errors/NotFound";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import {
  UpdateUserUsecase,
  UpdateUserUsecaseParams,
} from "../../interfaces/usecases/user/UpdateUserUsecase";
import { IUser } from "../../interfaces/objects/IUser";
import { userRepository } from "../../repositories/MysqlSequelizeRepository/UserRepository";

class RemoverFotoPerfil implements UpdateUserUsecase {
  constructor(private userRepository: IUserRepository) {}

  async validateUser(user: IUser) {
    const validation = await validate(user, { skipUndefinedProperties: true });

    if (validation[0] instanceof ClassValidatorValidationError) {
      const message = _.values(validation[0].constraints)[0];

      const field = validation[0].property;

      throw new ValidationError(message, field);
    }
  }

  async saveNewProfilePic(newProfilePic: File, oldProfilePic: string) {
    const newProfilePicBuffer = Buffer.from(await newProfilePic.arrayBuffer());
    const newFilename = `${Date.now()}${newProfilePic.name.replaceAll(
      " ",
      "_"
    )}`;

    if (oldProfilePic) {
      await unlink(
        path.resolve(
          __dirname,
          "..",
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
          oldProfilePic
        )
      );
    }

    await writeFile(
      path.resolve(
        __dirname,
        "..",
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
        newFilename
      ),
      newProfilePicBuffer
    );

    return {
      newFilename,
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

  async update(params: UpdateUserUsecaseParams) {
    console.log("params", params);
    const user = await this.userRepository.getOne(params.id);
    const oldEmail = user.email;
    const oldUsername = user.nomeUsuario;
    const oldProfilePic = user.profilePic;

    if (!user) {
      throw new NotFoundError("Usuário não encontrado", "user");
    }

    user.assign({
      ...params,
      profilePic: undefined,
    });

    await this.validateUser(user);

    if (params.email !== oldEmail) {
      user.verifyUserWithTheSameEmail();
    }

    if (params.nomeUsuario !== oldUsername) {
      user.verifyUserWithTheSameUsername();
    }

    if (params.senha) {
      console.log("tá chegar aqui");
      this.verifyRepeatedPassword(params.repetirSenha, params.senha);

      user.encryptPassword();
      user.repetirSenha = user.senha;
    }

    if (params.profilePic || isNotEmpty(params.profilePic)) {
      const { newFilename } = await this.saveNewProfilePic(
        params.profilePic,
        oldProfilePic
      );

      user.profilePic = newFilename;
    }

    const userUpdated = await this.userRepository.update(user);

    return { user: userUpdated, updated: true };
  }
}

const updateUserService = new UpdateUserService(userRepository);

export { updateUserService };
