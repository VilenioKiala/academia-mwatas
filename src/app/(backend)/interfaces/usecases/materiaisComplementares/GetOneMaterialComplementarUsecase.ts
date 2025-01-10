import { IMaterialComplementar } from "../../objects/IMaterialComplementar";

interface GetOneMaterialComplementarUsecase {
  get(id: string): Promise<IMaterialComplementar>;
}

export type { GetOneMaterialComplementarUsecase };
