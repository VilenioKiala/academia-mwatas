import { IAvaliacao } from "../../objects/IAvaliacao";

type CreateAvaliacaoUsecaseParams = {
  nota: number;
  userId: string;
  videoAulaId: string;
};

interface CreateAvaliacaoUsecase {
  create(params: CreateAvaliacaoUsecaseParams): Promise<IAvaliacao>;
}

export type { CreateAvaliacaoUsecase, CreateAvaliacaoUsecaseParams };
