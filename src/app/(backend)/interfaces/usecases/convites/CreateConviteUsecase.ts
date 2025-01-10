import { IConvite } from "../../objects/IConvite";

type CreateConviteUsecaseParams = {
  imagem: File;
  textoDestaque: string;
  textoChamada: string;
};

interface CreateConviteUsecase {
  create(params: CreateConviteUsecaseParams): Promise<IConvite>;
}

export type { CreateConviteUsecase, CreateConviteUsecaseParams };
