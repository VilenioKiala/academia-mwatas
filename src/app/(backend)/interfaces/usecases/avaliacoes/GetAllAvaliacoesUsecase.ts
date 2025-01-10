import { IAvaliacao } from "../../objects/IAvaliacao";

interface GetAllAvaliacoesUsecase {
  get(): Promise<IAvaliacao[]>;
}

export type { GetAllAvaliacoesUsecase };
