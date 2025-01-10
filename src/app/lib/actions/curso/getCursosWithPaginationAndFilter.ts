"use server";

import { CursoFilterParams } from "@/app/(backend)/interfaces/repositories/ICursoRepository";
import { getCursosWithPaginationAndFilterService } from "@/app/(backend)/services/course/GetCursosWithPaginationAndFilter";
import { cache } from "react";

export const getCursosWithPaginationAndFilter = cache(
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
      disponibilidade:
        (param.filter && param.filter.disponibilidade) || undefined,
      query:
        (param.filter && param.filter.query !== "" && param.filter.query) ||
        undefined,
    };

    const take = param.take || undefined;

    const cursos = await getCursosWithPaginationAndFilterService.get({
      cursosPerPage,
      page,
      filter,
      take: Number(take),
    });

    return cursos;
  }
);
