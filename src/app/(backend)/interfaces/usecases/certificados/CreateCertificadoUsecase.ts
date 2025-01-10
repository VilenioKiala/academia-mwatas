import { ICertificado } from "../../objects/ICertificado";

type CreateCertificadoParams = {
  imagem: File;
  texto?: string;
  userId: string;
  cursoId: string;
};

interface CreateCertificadoUsecase {
  create(params: CreateCertificadoParams): Promise<ICertificado>;
}

export type { CreateCertificadoUsecase, CreateCertificadoParams };
