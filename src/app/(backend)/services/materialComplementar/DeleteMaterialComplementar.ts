import { unlink } from "fs/promises";
import path from "path";
import { DeleteMaterialComplementarUsecase } from "../../interfaces/usecases/materiaisComplementares/DeleteMaterialComplementarUsecase";
import { IMaterialComplementarRepository } from "../../interfaces/repositories/IMaterialComplementarRepository";
import { materialComplementarRepository } from "../../repositories/MysqlSequelizeRepository/MaterialComplementarRepository";

class DeleteMaterialComplementarService
  implements DeleteMaterialComplementarUsecase
{
  constructor(
    private materialComplementarRepository: IMaterialComplementarRepository
  ) {}

  async deleteFicheiro(ficheiroName: string) {
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
        "materiais_complementares",
        ficheiroName
      )
    );
  }

  async delete(id: string) {
    const materialComplementar =
      await this.materialComplementarRepository.delete(id);

    await this.deleteFicheiro(materialComplementar.ficheiro);

    return { materialComplementar, deleted: true };
  }
}

const deleteMaterialComplementarService = new DeleteMaterialComplementarService(
  materialComplementarRepository
);

export { deleteMaterialComplementarService };
