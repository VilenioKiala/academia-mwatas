import { prisma } from "@/prisma/prisma";
import { ICertificadoRepository } from "../../interfaces/repositories/ICertificadoRepository";
import { ICertificado } from "../../interfaces/objects/ICertificado";
import { Certificado } from "../../entities/Certificado";

class CertificadoRepository implements ICertificadoRepository {
  async create(certificado: ICertificado) {
    await prisma.certificado.create({
      data: {
        imagem: certificado.imagem,
        cursoId: certificado.cursoId,
        userId: certificado.userId,
        texto: certificado.texto,
      },
    });

    return certificado;
  }

  async getAll() {
    const certificado = await prisma.certificado.findMany({
      include: {
        usuario: true,
        curso: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return certificado.map((certificado) => {
      return Object.assign(new Certificado(), {
        ...certificado,
      });
    });
  }

  async getOne(id: string) {
    const certificado = await prisma.certificado.findUnique({
      where: { id },
      include: { usuario: true, curso: true },
    });

    if (!certificado) return null;

    return Object.assign(new Certificado(), {
      ...certificado,
    });
  }

  async getCertificadosOfUsuario(usuarioId: string) {
    const certificados = await prisma.certificado.findMany({
      where: { userId: usuarioId },
      include: { usuario: true, curso: true },
    });

    return certificados.map((certificado) => {
      return Object.assign(new Certificado(), {
        ...certificado,
      });
    });
  }

  async getCertificadosOfCurso(cursoId: string): Promise<ICertificado[]> {
    const certificados = await prisma.certificado.findMany({
      where: { cursoId: cursoId },
      include: { usuario: true, curso: true },
    });

    return certificados.map((certificado) => {
      return Object.assign(new Certificado(), {
        ...certificado,
      });
    });
  }

  async delete(id: string) {
    const certificado = await prisma.certificado.delete({
      where: {
        id: id,
      },
    });

    return Object.assign(new Certificado(), {
      ...certificado,
    });
  }
}

const certificadoRepository = new CertificadoRepository();

export { certificadoRepository };
