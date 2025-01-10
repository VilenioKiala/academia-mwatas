import { IMaterialComplementar } from "../../objects/IMaterialComplementar";

interface DeleteMaterialComplementarUsecase {
  delete(
    id: string
  ): Promise<{ materialComplementar: IMaterialComplementar; deleted: boolean }>;
}

export type { DeleteMaterialComplementarUsecase };
