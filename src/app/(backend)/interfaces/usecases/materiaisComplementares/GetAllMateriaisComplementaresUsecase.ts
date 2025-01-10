import { IMaterialComplementar } from "../../objects/IMaterialComplementar";

interface GetAllMateriaisComplementaresUsecase {
  get(): Promise<IMaterialComplementar[]>;
}

export type { GetAllMateriaisComplementaresUsecase };
