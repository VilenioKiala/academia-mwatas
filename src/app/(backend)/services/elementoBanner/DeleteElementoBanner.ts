import { unlink } from "fs/promises";
import path from "path";
import { IElementoBannerRepository } from "../../interfaces/repositories/IElementoBannerRepository";
import { DeleteElementoBannerUsecase } from "../../interfaces/usecases/elementosBanner/DeleteElementoBannerUsecase";
import { elementoBannerRepository } from "../../repositories/MysqlSequelizeRepository/ElementoBannerRepository";

class DeleteElementoBanner implements DeleteElementoBannerUsecase {
  constructor(private elementoBannerRepository: IElementoBannerRepository) {}

  async deleteImageFile(coverName: string) {
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
        "elementoBannerPhotos",
        coverName
      )
    );
  }

  async delete(id: string) {
    const elementoBanner = await this.elementoBannerRepository.delete(id);

    await this.deleteImageFile(elementoBanner.photo);

    return { elementoBanner, deleted: true };
  }
}

const deleteElementoBanner = new DeleteElementoBanner(elementoBannerRepository);

export { deleteElementoBanner };
