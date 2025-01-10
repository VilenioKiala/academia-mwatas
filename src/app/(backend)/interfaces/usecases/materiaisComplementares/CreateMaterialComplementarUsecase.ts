import { IMaterialComplementar } from "../../objects/IMaterialComplementar";

type CreateMaterialComplementarUsecaseParams = {
  ficheiro: File;
  titulo: string;
  videoaulaId: string;
};

interface CreateMaterialComplementarUsecase {
  create(
    params: CreateMaterialComplementarUsecaseParams
  ): Promise<IMaterialComplementar>;
}

export type {
  CreateMaterialComplementarUsecase,
  CreateMaterialComplementarUsecaseParams,
};
