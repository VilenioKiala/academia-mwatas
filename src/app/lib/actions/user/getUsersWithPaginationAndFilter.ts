"use server";

import { UserFilterParams } from "@/app/(backend)/interfaces/repositories/IUserRepository";
import { getUsersWithPaginationAndFilterService } from "@/app/(backend)/services/user/GetUsersWithPaginationAndFilter";
import { cache } from "react";

export const getUsersWithPaginationAndFilter = cache(
  async (param: {
    page?: number;
    usersPerPage?: number;
    take?: number;
    filter?: UserFilterParams;
  }) => {
    const page = param.page || undefined;
    const usersPerPage = param.usersPerPage || undefined;

    const filter = {
      cursoIdMatriculado:
        (param.filter && param.filter.cursoIdMatriculado) || undefined,
      privilegio: (param.filter && param.filter.privilegio) || undefined,
      assinantes:
        param.filter && param.filter.assinantes == undefined
          ? undefined
          : param.filter.assinantes == false
          ? false
          : true,
      query:
        (param.filter && param.filter.query !== "" && param.filter.query) ||
        undefined,
    };

    const take = param.take || undefined;

    const users = await getUsersWithPaginationAndFilterService.get({
      usersPerPage,
      page,
      filter,
      take: Number(take),
    });

    return users;
  }
);
