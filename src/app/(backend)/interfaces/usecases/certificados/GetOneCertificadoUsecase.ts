import { ICertificado } from "../../objects/ICertificado";

interface GetOneCertificadoUsecase {
  get(id: string): Promise<ICertificado | null>;
}

export type { GetOneCertificadoUsecase };
