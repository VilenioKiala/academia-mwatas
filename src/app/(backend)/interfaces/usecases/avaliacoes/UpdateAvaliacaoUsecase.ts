import { IAvaliacao } from "../../objects/IAvaliacao";

type UpdateAvaliacaoUsecaseParams = {
  id: string;
  nota?: number;
  videoAulaId?: string;
  userId?: string;
};

interface UpdateAvaliacaoUsecase {
  update(
    params: UpdateAvaliacaoUsecaseParams
  ): Promise<{ avaliacao: IAvaliacao; updated: boolean }>;
}

export type { UpdateAvaliacaoUsecase, UpdateAvaliacaoUsecaseParams };
