import { ICertificadoRepository } from "../../interfaces/repositories/ICertificadoRepository";
import { DeleteCertificadoUsecase } from "../../interfaces/usecases/certificados/DeleteCertificadoUsecase";
import { certificadoRepository } from "../../repositories/MysqlSequelizeRepository/CertificadoRepository";

class DeleteCertificadoService implements DeleteCertificadoUsecase {
  constructor(private certificadoRepository: ICertificadoRepository) {}

  async delete(id: string) {
    const certificado = await this.certificadoRepository.delete(id);

    return { certificado, deleted: true };
  }
}

const deleteCertificadoService = new DeleteCertificadoService(
  certificadoRepository
);

export { deleteCertificadoService };
