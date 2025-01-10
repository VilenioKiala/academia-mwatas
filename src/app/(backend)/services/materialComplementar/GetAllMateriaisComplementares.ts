import { IMaterialComplementarRepository } from "../../interfaces/repositories/IMaterialComplementarRepository";
import { GetAllMateriaisComplementaresUsecase } from "../../interfaces/usecases/materiaisComplementares/GetAllMateriaisComplementaresUsecase";
import { materialComplementarRepository } from "../../repositories/MysqlSequelizeRepository/MaterialComplementarRepository";

class GetAllMateriaisComplementaresService
  implements GetAllMateriaisComplementaresUsecase
{
  constructor(
    private materialComplementarRepository: IMaterialComplementarRepository
  ) {}

  async get() {
    const materiaisComplementares =
      await this.materialComplementarRepository.getAll();

    return materiaisComplementares;
  }
}

const getAllMateriaisComplementaresService =
  new GetAllMateriaisComplementaresService(materialComplementarRepository);

export { getAllMateriaisComplementaresService };
