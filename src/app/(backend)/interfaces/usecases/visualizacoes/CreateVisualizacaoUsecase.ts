import { IVisualizacao } from "../../objects/IVisualizacao";

type CreateVisualizacaoUsecaseParams = {
  userId: string;
  videoaulaId: string;
};

interface CreateVisualizacaoUsecaseUsecase {
  create({
    userId,
    videoaulaId,
  }: CreateVisualizacaoUsecaseParams): Promise<IVisualizacao>;
}

export type {
  CreateVisualizacaoUsecaseUsecase,
  CreateVisualizacaoUsecaseParams,
};
