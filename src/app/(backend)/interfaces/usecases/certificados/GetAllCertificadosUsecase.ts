import { ICertificado } from "../../objects/ICertificado";

interface GetAllCertificadosUsecase {
  get(): Promise<ICertificado[]>;
}

export type { GetAllCertificadosUsecase };
