import { prisma } from "@/prisma/prisma";
import { IMatriculaRepository } from "../../interfaces/repositories/IMatriculaRepository";
import { IMatricula } from "../../interfaces/objects/IMatricula";
import { Matricula } from "../../entities/Matricula";

class MatriculaRepository implements IMatriculaRepository {
  async create(matricula: IMatricula) {
    await prisma.matricula.create({
      data: {
        cursoId: matricula.cursoId,
        userId: matricula.userId,
        dataExpiracao: matricula.dataExpiracao,
      },
    });

    return matricula;
  }

  async getAll(page?: number, filter?: { userId?: string; cursoId?: string }) {
    if (page) {
      const matriculasPerPage = 2;
      const NumberOfMatriculas = await prisma.matricula.count();
      console.log("Numero de Matrículas na db:", NumberOfMatriculas);
      const totalPages = Math.ceil(NumberOfMatriculas / matriculasPerPage);

      const matriculas = await prisma.matricula.findMany({
        take: matriculasPerPage,
        skip: (page - 1) * 2,
        include: {
          curso: true,
          usuario: true,
        },
        where: {
          ...filter,
        },
      });

      console.log("todas as matriculas:", await prisma.matricula.findMany());

      const toObjectMatricula = matriculas.map((matricula) =>
        Object.assign(new Matricula(), { ...matricula })
      );

      return {
        results: toObjectMatricula,
        totalPages,
      };
    } else {
      const matriculas = await prisma.matricula.findMany({
        include: {
          curso: true,
          usuario: true,
        },
      });

      return matriculas.map((matricula) =>
        Object.assign(new Matricula(), { ...matricula })
      );
    }
  }

  async getOne(id: string) {
    const matricula = await prisma.matricula.findUnique({ where: { id } });

    if (!matricula) return null;

    return Object.assign(new Matricula(), { ...matricula });
  }

  async getOneFromCursoAndUser(cursoId: string, userId: string) {
    const matricula = await prisma.matricula.findFirst({
      where: { cursoId, userId },
    });

    if (!matricula) return null;

    return Object.assign(new Matricula(), { ...matricula });
  }

  async update(matricula: IMatricula) {
    await prisma.matricula.update({
      where: { id: matricula.id },
      data: {
        dataExpiracao: matricula.dataExpiracao,
        cursoId: matricula.cursoId,
        userId: matricula.userId,
      },
    });

    return matricula;
  }

  async delete(id: string) {
    const matricula = await prisma.matricula.delete({
      where: {
        id: id,
      },
    });

    return Object.assign(new Matricula(), {
      ...matricula,
    });
  }
}

const matriculaRepository = new MatriculaRepository();

export { matriculaRepository };
