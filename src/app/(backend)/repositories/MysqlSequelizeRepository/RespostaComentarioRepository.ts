import { prisma } from "@/prisma/prisma";
import { IRespostaComentario } from "../../interfaces/objects/IRespostaComentario";
import { RespostaComentario } from "../../entities/RespostaComentario";
import { IRespostaComentarioRepository } from "../../interfaces/repositories/IRespostaComentarioRepository";

class RespostaComentarioRepository implements IRespostaComentarioRepository {
  async create(respostaComentario: IRespostaComentario) {
    await prisma.respostaComentario.create({
      data: {
        texto: respostaComentario.texto,
        comentarioId: respostaComentario.comentarioId,
        userId: respostaComentario.userId,
      },
    });

    return respostaComentario;
  }

  async getAll() {
    const respostasComentario = await prisma.respostaComentario.findMany({
      include: {
        comentario: true,
        usuario: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return respostasComentario.map((respostaComentario) => {
      return Object.assign(new RespostaComentario(), {
        ...respostaComentario,
      });
    });
  }

  async getOne(id: string) {
    const respostaComentario = await prisma.respostaComentario.findUnique({
      where: { id },
      include: { usuario: true, comentario: true },
    });

    if (!respostaComentario) return null;

    return Object.assign(new RespostaComentario(), {
      ...respostaComentario,
    });
  }

  async getAllRespostasFromComentario(comentarioId: string) {
    const respostasComentario = await prisma.respostaComentario.findMany({
      where: {
        comentarioId,
      },
      include: {
        comentario: true,
        usuario: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return respostasComentario.map((respostaComentario) => {
      return Object.assign(new RespostaComentario(), {
        ...respostaComentario,
      });
    });
  }
}

const respostaComentarioRepository = new RespostaComentarioRepository();

export { respostaComentarioRepository };
