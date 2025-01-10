import { ICertificado } from "../objects/ICertificado";

interface ICertificadoRepository {
  getAll(): Promise<ICertificado[]>;
  getOne(id: string): Promise<ICertificado | null>;
  getCertificadosOfUsuario(usuarioId: string): Promise<ICertificado[]>;
  getCertificadosOfCurso(cursoId: string): Promise<ICertificado[]>;
  create(certificado: ICertificado): Promise<ICertificado>;
  delete(id: string): Promise<ICertificado>;
}

export type { ICertificadoRepository };
