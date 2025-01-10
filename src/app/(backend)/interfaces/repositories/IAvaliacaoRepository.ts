import { IAvaliacao } from "../objects/IAvaliacao";

interface IAvaliacaoRepository {
  getAll(): Promise<IAvaliacao[]>;
  getOne(id: string): Promise<IAvaliacao | null>;
  getOneAvaliacaoFromFilter(filter?: {
    userId?: string;
    videoaulaId?: string;
  }): Promise<IAvaliacao | null>;
  create(avaliacao: IAvaliacao): Promise<IAvaliacao>;
  update(avaliacao: IAvaliacao, avaliacaoId: string): Promise<IAvaliacao>;
  delete(id: string): Promise<IAvaliacao>;
}

export type { IAvaliacaoRepository };
