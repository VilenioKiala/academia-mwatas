import { ICertificado } from "../../objects/ICertificado";

interface DeleteCertificadoUsecase {
  delete(id: string): Promise<{ certificado: ICertificado; deleted: boolean }>;
}

export type { DeleteCertificadoUsecase };
