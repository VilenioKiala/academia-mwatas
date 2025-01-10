import { IMaterialComplementarRepository } from "../../interfaces/repositories/IMaterialComplementarRepository";
import { GetOneMaterialComplementarUsecase } from "../../interfaces/usecases/materiaisComplementares/GetOneMaterialComplementarUsecase";
import { materialComplementarRepository } from "../../repositories/MysqlSequelizeRepository/MaterialComplementarRepository";

class GetOneMaterialComplementarService
  implements GetOneMaterialComplementarUsecase
{
  constructor(
    private materialComplementarRepository: IMaterialComplementarRepository
  ) {}

  async get(id: string) {
    const materialComplementar =
      await this.materialComplementarRepository.getOne(id);

    return materialComplementar;
  }
}

const getOneMaterialComplementarService = new GetOneMaterialComplementarService(
  materialComplementarRepository
);

export { getOneMaterialComplementarService };
