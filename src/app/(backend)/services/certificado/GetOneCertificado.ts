import { ICertificadoRepository } from "../../interfaces/repositories/ICertificadoRepository";
import { GetOneCertificadoUsecase } from "../../interfaces/usecases/certificados/GetOneCertificadoUsecase";
import { certificadoRepository } from "../../repositories/MysqlSequelizeRepository/CertificadoRepository";

class GetOneCertificadoService implements GetOneCertificadoUsecase {
  constructor(private certificadoRepository: ICertificadoRepository) {}

  async get(id: string) {
    const certificado = await this.certificadoRepository.getOne(id);

    return certificado;
  }
}

const getOneCertificadoService = new GetOneCertificadoService(
  certificadoRepository
);

export { getOneCertificadoService };
