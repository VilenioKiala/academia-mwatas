import { unlink } from "fs/promises";
import path from "path";
import { DeleteUserUsecase } from "../../interfaces/usecases/user/DeleteUserUsecase";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import { userRepository } from "../../repositories/MysqlSequelizeRepository/UserRepository";

class DeleteUserService implements DeleteUserUsecase {
  constructor(private userRepository: IUserRepository) {}

  async deleteFile(fileName: string) {
    await unlink(
      path.join(
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
        fileName
      )
    );
  }

  async delete(id: string) {
    const user = await this.userRepository.delete(id);

    await this.deleteFile(user.profilePic);

    return { user, deleted: true };
  }
}

const deleteUserService = new DeleteUserService(userRepository);

export { deleteUserService };
