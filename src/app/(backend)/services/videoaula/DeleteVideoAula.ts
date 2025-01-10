import { unlink } from "fs/promises";
import path from "path";
import { DeleteVideoAulaUsecase } from "../../interfaces/usecases/videoaulas/DeleteVideoAulaUsecase";
import { IVideoAulaRepository } from "../../interfaces/repositories/IVideoAulaRepository";
import { videoAulaRepository } from "../../repositories/MysqlSequelizeRepository/VideoAulaRepository";

class DeleteVideoAulaService implements DeleteVideoAulaUsecase {
  constructor(private videoaulaRepository: IVideoAulaRepository) {}

  async deleteVideoAulaFile(filename: string) {
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
        "videoaulas",
        filename
      )
    );
  }

  async delete(id: string) {
    const videoaula = await this.videoaulaRepository.delete(id);

    await this.deleteVideoAulaFile(videoaula.video);

    return { videoaula, deleted: true };
  }
}

const deleteVideoAulaService = new DeleteVideoAulaService(videoAulaRepository);

export { deleteVideoAulaService };
