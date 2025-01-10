import { IVideoAula } from "../../objects/IVideoAula";

type CreateVideoAulaParams = {
  video: File;
  titulo: string;
  descricao?: string;
  dataAgendamento: Date;
  duracao: number;
  moduloId: string;
};

interface CreateVideoAulaUsecase {
  create(params: CreateVideoAulaParams): Promise<IVideoAula>;
}

export type { CreateVideoAulaUsecase, CreateVideoAulaParams };
