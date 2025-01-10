import React from "react";
import { getCursos } from "@/app/lib/actions/curso/getCursos";
import TabelaMembros from "../TabelaMembros";
import { auth } from "@/app/auth";
import { redirect, RedirectType } from "next/navigation";
import { getOneUserId } from "@/app/lib/actions/user/getOneUserId";
import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";
import FiltroMembrosPorCurso from "../FiltroMembrosPorCurso";
import SearchForm from "../SearchForm";
import { getUsersWithPaginationAndFilter } from "@/app/lib/actions/user/getUsersWithPaginationAndFilter";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page = "1", search = "", cursoId } = await searchParams;

  const session = await auth();

  if (!session) {
    redirect("/signin", RedirectType.replace);
  }

  const userLogged = await getOneUserId(session?.user?.id);

  if (!userLogged) {
    redirect("/signin", RedirectType.replace);
  }

  const cursos = await getCursos({});

  const membrosResponse = await getUsersWithPaginationAndFilter({
    filter: {
      cursoIdMatriculado: (cursoId && cursoId.toString()) || undefined,
      query: (search && search.toString()) || undefined,
      assinantes: true,
    },
    page: page ? Number(page) : 1,
    usersPerPage: 10,
  });

  return (
    <div>
      <div className="w-full flex justify-between mt-6">
        <FiltroMembrosPorCurso
          cursos={cursos.map((curso) => {
            return { ...curso };
          })}
        />
        <SearchForm initialValue={search.toString()} />
      </div>
      <TabelaMembros
        userLogged={{ ...userLogged }}
        cursos={cursos.map((curso: ICurso) => {
          return { ...curso };
        })}
        page={Number(page) || 1}
        totalPages={Number(membrosResponse.totalPages)}
        users={membrosResponse.results.map((membro) => {
          return {
            ...membro,
          };
        })}
      />
    </div>
  );
}
