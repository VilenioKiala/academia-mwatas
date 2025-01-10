import { prisma } from "@/prisma/prisma";
import { IComentario } from "../../interfaces/objects/IComentario";
import { Comentario } from "../../entities/Comentario";
import { IComentarioRepository } from "../../interfaces/repositories/IComentarioRepository";

class ComentarioRepository implements IComentarioRepository {
  async create(comentario: IComentario) {
    await prisma.comentario.create({
      data: {
        texto: comentario.texto,
        userId: comentario.userId,
        videoAulaId: comentario.videoAulaId,
      },
    });

    return comentario;
  }

  async getAll(filter?: {
    userId?: string;
    lido?: boolean;
    reprovado?: boolean;
  }) {
    const comentarios = await prisma.comentario.findMany({
      include: {
        videoAula: true,
        usuario: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      where: filter,
    });

    return comentarios.map((comentario) => {
      return Object.assign(new Comentario(), {
        ...comentario,
      });
    });
  }

  // async getComentariosWithPaginationAndFilter(
  //   page?: number,
  //   comentariosPerPage?: number,
  //   filter?: CursoFilterParams
  // ) {
  //   let cursos: ICurso[];
  //   const NumberOfCursos = await prisma.curso.count({
  //     where: {
  //       categoriaId: filter.categoriaId ? filter.categoriaId : undefined,
  //       titulo: filter.query && {
  //         contains: `_${filter.query.toString()}`,
  //       },
  //       preco: filter.disponibilidade && {
  //         gt: filter.disponibilidade == "paid" ? 0 : undefined,
  //         equals: filter.disponibilidade == "free" ? 0 : undefined,
  //       },
  //     },
  //   });

  //   const totalPages = Math.ceil(NumberOfCursos / cursosPerPage);

  //   cursos = await prisma.curso.findMany({
  //     take: cursosPerPage || 2,
  //     skip: (page - 1) * (cursosPerPage || 2),
  //     where: {
  //       categoriaId: filter.categoriaId ? filter.categoriaId : undefined,
  //       titulo: filter.query && {
  //         contains: `_${filter.query.toString()}`,
  //       },
  //       preco: filter.disponibilidade && {
  //         gt: filter.disponibilidade == "paid" ? 0 : undefined,
  //         equals: filter.disponibilidade == "free" ? 0 : undefined,
  //       },
  //     },
  //     include: {
  //       modulos: {
  //         include: {
  //           videoAulas: true,
  //         },
  //       },
  //     },
  //   });

  //   const toObjectUser = cursos.map((curso) =>
  //     Object.assign(new Curso(), { ...curso })
  //   );

  //   return {
  //     results: toObjectUser,
  //     totalPages,
  //   };
  // }

  async getOne(id: string) {
    const comentario = await prisma.comentario.findUnique({
      where: { id },
      include: { usuario: true, videoAula: true },
    });

    if (!comentario) return null;

    return Object.assign(new Comentario(), {
      ...comentario,
    });
  }

  async update(
    comentario: IComentario,
    comentarioId: string,
    videoaulaId: string
  ) {
    await prisma.comentario.update({
      where: { id: comentarioId },
      data: {
        videoAulaId: videoaulaId,
        texto: comentario.texto,
        lido: comentario.lido,
        reprovado: comentario.reprovado,
        userId: comentario.userId,
      },
    });

    return comentario;
  }

  async delete(id: string) {
    const comentario = await prisma.comentario.delete({
      where: {
        id: id,
      },
    });

    return Object.assign(new Comentario(), {
      ...comentario,
    });
  }
}

const comentarioRepository = new ComentarioRepository();

export { comentarioRepository };
