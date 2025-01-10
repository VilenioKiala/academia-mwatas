"use server";

import { CursoFilterParams } from "@/app/(backend)/interfaces/repositories/ICursoRepository";
import { getAllCursosService } from "@/app/(backend)/services/course/GetAllCursos";
import { cache } from "react";

export const getCursos = cache(
  async (param: {
    page?: number;
    cursosPerPage?: number;
    take?: number;
    filter?: CursoFilterParams;
  }) => {
    const page = param.page || undefined;
    const cursosPerPage = param.cursosPerPage || undefined;

    const filter = {
      categoriaId: (param.filter && param.filter.categoriaId) || undefined,
      query:
        (param.filter && param.filter.query !== "" && param.filter.query) ||
        undefined,
    };

    const take = param.take || undefined;

    const cursos = await getAllCursosService.get({
      cursosPerPage,
      page,
      filter,
      take: Number(take),
    });

    return cursos;
  }
);
