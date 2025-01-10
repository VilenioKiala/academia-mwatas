import { IElementoBannerRepository } from "../../interfaces/repositories/IElementoBannerRepository";
import { GetAllElementosBannerUsecase } from "../../interfaces/usecases/elementosBanner/GetAllElementosBannerUsecase";
import { elementoBannerRepository } from "../../repositories/MysqlSequelizeRepository/ElementoBannerRepository";

class GetAllElementosBannerService implements GetAllElementosBannerUsecase {
  constructor(private elementoBannerRepository: IElementoBannerRepository) {}

  async get() {
    const elementosBanner = await this.elementoBannerRepository.getAll();

    return elementosBanner;
  }
}

const getAllElementosBannerService = new GetAllElementosBannerService(
  elementoBannerRepository
);

export { getAllElementosBannerService };
