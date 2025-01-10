import { prisma } from "@/prisma/prisma";
import {
  CursoFilterParams,
  ICursoRepository,
} from "../../interfaces/repositories/ICursoRepository";
import { Curso } from "../../entities/Curso";
import { ICurso } from "../../interfaces/objects/ICurso";

class CursoRepository implements ICursoRepository {
  async create(curso: ICurso, categoriaId: string) {
    await prisma.curso.create({
      data: {
        coverCurso: curso.coverCurso,
        titulo: curso.titulo,
        preco: curso.preco,
        fraseDestaque: curso.fraseDestaque,
        categoriaId: categoriaId,
        sobreOCurso: curso.sobreOCurso,
      },
    });

    return curso;
  }

  async getAll() {
    const cursos = await prisma.curso.findMany({
      include: {
        modulos: {
          include: {
            videoAulas: true,
          },
        },
      },
    });

    return cursos.map((curso) => Object.assign(new Curso(), { ...curso }));
  }

  async getCursosWithPaginationAndFilter(
    page?: number,
    cursosPerPage?: number,
    filter?: CursoFilterParams
  ) {
    let cursos: ICurso[];
    const NumberOfCursos = await prisma.curso.count({
      where: {
        categoriaId: filter.categoriaId ? filter.categoriaId : undefined,
        titulo: filter.query && {
          contains: `_${filter.query.toString()}`,
        },
        preco: filter.disponibilidade && {
          gt: filter.disponibilidade == "paid" ? 0 : undefined,
          equals: filter.disponibilidade == "free" ? 0 : undefined,
        },
      },
    });

    const totalPages = Math.ceil(NumberOfCursos / cursosPerPage);

    cursos = await prisma.curso.findMany({
      take: cursosPerPage || 2,
      skip: (page - 1) * (cursosPerPage || 2),
      where: {
        categoriaId: filter.categoriaId ? filter.categoriaId : undefined,
        titulo: filter.query && {
          contains: `_${filter.query.toString()}`,
        },
        preco: filter.disponibilidade && {
          gt: filter.disponibilidade == "paid" ? 0 : undefined,
          equals: filter.disponibilidade == "free" ? 0 : undefined,
        },
      },
      include: {
        modulos: {
          include: {
            videoAulas: true,
          },
        },
      },
    });

    const toObjectUser = cursos.map((curso) =>
      Object.assign(new Curso(), { ...curso })
    );

    return {
      results: toObjectUser,
      totalPages,
    };
  }

  async getOne(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (!id) null;
    const curso = await prisma.curso.findUnique({
      where: { id },
      include: {
        matriculas: true,
        categoria: true,
        modulos: {
          include: {
            videoAulas: {
              include: {
                visualizacoes: true,
                materiaisComplementares: true,
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!curso) return null;

    return Object.assign(new Curso(), {
      ...curso,
    });
  }

  async update(course: ICurso, categoriaId: string, courseId: string) {
    await prisma.curso.update({
      where: { id: courseId },
      data: {
        categoriaId: categoriaId,
        preco: course.preco,
        coverCurso: course.coverCurso,
        fraseDestaque: course.fraseDestaque,
        sobreOCurso: course.sobreOCurso,
        titulo: course.titulo,
      },
    });

    return course;
  }

  async delete(id: string) {
    const cursp = await prisma.curso.delete({
      where: {
        id: id,
      },
    });

    return Object.assign(new Curso(), {
      ...cursp,
    });
  }
}

const cursoRepository = new CursoRepository();

export { cursoRepository };
