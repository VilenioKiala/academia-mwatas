import { prisma } from "@/prisma/prisma";
import { IVisualizacaoRepository } from "../../interfaces/repositories/IVisualizacaoRepository";
import { IVisualizacao } from "../../interfaces/objects/IVisualizacao";
import { Visualizacao } from "../../entities/Visualizacao";

class VisualizacaoRepository implements IVisualizacaoRepository {
  async create(visualizacao: IVisualizacao) {
    await prisma.visualizacao.create({
      data: {
        videoaulaId: visualizacao.videoaulaId,
        userId: visualizacao.userId,
      },
    });

    return visualizacao;
  }

  async getAll(filter?: { userId?: string; videoaulaId?: string }) {
    const categories = await prisma.visualizacao.findMany({
      include: {
        user: true,
        videoaula: true,
      },
      where: filter,
    });

    return categories.map((visualizacao) => {
      return Object.assign(new Visualizacao(), {
        ...visualizacao,
      });
    });
  }

  async getOne(id: string) {
    const visualizacao = await prisma.visualizacao.findUnique({
      where: { id },
      include: { user: true, videoaula: true },
    });

    if (!visualizacao) return null;

    return Object.assign(new Visualizacao(), {
      ...visualizacao,
    });
  }

  async getOneVisualizacaoFromFilter(filter?: {
    userId?: string;
    videoaulaId?: string;
  }) {
    const visualizacao = await prisma.visualizacao.findFirst({
      where: { userId: filter.userId, videoaulaId: filter.videoaulaId },
      include: { videoaula: true, user: true },
    });

    if (!visualizacao) return null;

    return Object.assign(new Visualizacao(), {
      ...visualizacao,
    });
  }

  async update(visualizacao: IVisualizacao, visualizacaoId: string) {
    await prisma.visualizacao.update({
      where: { id: visualizacaoId },
      data: {
        videoaulaId: visualizacao.videoaulaId,
        userId: visualizacao.userId,
      },
    });

    return visualizacao;
  }

  async delete(id: string) {
    const visualizacao = await prisma.visualizacao.delete({
      where: {
        id: id,
      },
    });

    return Object.assign(new Visualizacao(), {
      ...visualizacao,
    });
  }
}

const visualizacaoRepository = new VisualizacaoRepository();

export { visualizacaoRepository };
