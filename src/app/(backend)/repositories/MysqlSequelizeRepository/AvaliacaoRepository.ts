import { prisma } from "@/prisma/prisma";
import { IAvaliacaoRepository } from "../../interfaces/repositories/IAvaliacaoRepository";
import { IAvaliacao } from "../../interfaces/objects/IAvaliacao";
import { Avaliacao } from "../../entities/Avaliacao";

class AvaliacaoRepository implements IAvaliacaoRepository {
  async create(avaliacao: IAvaliacao) {
    await prisma.avaliacao.create({
      data: {
        nota: avaliacao.nota,
        userId: avaliacao.userId,
        videoAulaId: avaliacao.videoAulaId,
      },
    });

    return avaliacao;
  }

  async getAll() {
    const avaliacoes = await prisma.avaliacao.findMany({
      include: {
        user: true,
        videoAula: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return avaliacoes.map((avaliacao) => {
      return Object.assign(new Avaliacao(), {
        ...avaliacao,
      });
    });
  }

  async getOne(id: string) {
    const avaliacao = await prisma.avaliacao.findUnique({
      where: { id },
      include: { videoAula: true, user: true },
    });

    if (!avaliacao) return null;

    return Object.assign(new Avaliacao(), {
      ...avaliacao,
    });
  }

  async getOneAvaliacaoFromFilter(filter?: {
    userId?: string;
    videoaulaId?: string;
  }) {
    const avaliacao = await prisma.avaliacao.findFirst({
      where: { userId: filter.userId, videoAulaId: filter.videoaulaId },
      include: { videoAula: true, user: true },
    });

    if (!avaliacao) return null;

    return Object.assign(new Avaliacao(), {
      ...avaliacao,
    });
  }

  async update(avaliacao: IAvaliacao, avaliacaoId: string) {
    await prisma.avaliacao.update({
      where: { id: avaliacaoId },
      data: {
        nota: avaliacao.nota,
        videoAulaId: avaliacao.videoAulaId,
        userId: avaliacao.userId,
      },
    });

    return avaliacao;
  }

  async delete(id: string) {
    const avaliacao = await prisma.avaliacao.delete({
      where: {
        id: id,
      },
    });

    return Object.assign(new Avaliacao(), {
      ...avaliacao,
    });
  }
}

const avaliacaoRepository = new AvaliacaoRepository();

export { avaliacaoRepository };
