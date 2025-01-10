import { IMaterialComplementar } from "../objects/IMaterialComplementar";

interface IMaterialComplementarRepository {
  getAll(): Promise<IMaterialComplementar[]>;
  getOne(id: string): Promise<IMaterialComplementar | null>;
  create(
    materialComplementar: IMaterialComplementar,
    videoaulaId: string
  ): Promise<IMaterialComplementar>;
  update(
    materialComplementar: IMaterialComplementar,
    materialComplementarId: string,
    videoaulaId?: string
  ): Promise<IMaterialComplementar>;
  delete(id: string): Promise<IMaterialComplementar>;
}

export type { IMaterialComplementarRepository };
