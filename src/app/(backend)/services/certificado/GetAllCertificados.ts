import { ICertificadoRepository } from "../../interfaces/repositories/ICertificadoRepository";
import { GetAllCertificadosUsecase } from "../../interfaces/usecases/certificados/GetAllCertificadosUsecase";
import { certificadoRepository } from "../../repositories/MysqlSequelizeRepository/CertificadoRepository";

class GetAllCertificadosService implements GetAllCertificadosUsecase {
  constructor(private certificadoRepository: ICertificadoRepository) {}

  async get() {
    const certificados = await this.certificadoRepository.getAll();

    return certificados;
  }
}

const getAllCertificadosService = new GetAllCertificadosService(
  certificadoRepository
);

export { getAllCertificadosService };
