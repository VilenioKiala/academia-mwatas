import { prisma } from "@/prisma/prisma";
import { IVideoAula } from "../../interfaces/objects/IVideoAula";
import { IVideoAulaRepository } from "../../interfaces/repositories/IVideoAulaRepository";
import { VideoAula } from "../../entities/VideoAula";

class VideoAulaRepository implements IVideoAulaRepository {
  async create(videoaula: IVideoAula, moduloId: string) {
    await prisma.videoAula.create({
      data: {
        titulo: videoaula.titulo,
        video: videoaula.video,
        descricao: videoaula.descricao,
        duracao: videoaula.duracao,
        moduloId: moduloId,
        dataAgendamento: videoaula.dataAgendamento,
      },
    });

    return videoaula;
  }

  async getAll(numeroData: number) {
    const videoAulas = await prisma.videoAula.findMany({
      include: {
        modulo: {
          include: {
            curso: {
              include: {
                matriculas: true,
              },
            },
          },
        },
      },
      take: numeroData,
    });

    return videoAulas.map((videoaula) => {
      return Object.assign(new VideoAula(), {
        ...videoaula,
      });
    });
  }

  async getOne(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (!id) null;

    const videoaula = await prisma.videoAula.findUnique({
      where: { id },
      include: {
        comentarios: {
          include: {
            respostas: true,
            usuario: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        modulo: {
          include: {
            videoAulas: true,
          },
        },
        avaliacoes: true,
        visualizacoes: true,
        materiaisComplementares: true,
      },
    });

    if (!videoaula) return null;

    return Object.assign(new VideoAula(), {
      ...videoaula,
    });
  }

  async delete(id: string) {
    const videoaula = await prisma.videoAula.delete({
      where: {
        id: id,
      },
    });

    return Object.assign(new VideoAula(), {
      ...videoaula,
    });
  }
}

const videoAulaRepository = new VideoAulaRepository();

export { videoAulaRepository };
