import React from "react";
import TabelaMembros from "./TabelaMembros";
import { getCursos } from "@/app/lib/actions/curso/getCursos";
import { redirect, RedirectType } from "next/navigation";
import { getOneUserId } from "@/app/lib/actions/user/getOneUserId";
import { auth } from "@/app/auth";
import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";
import SearchForm from "./SearchForm";
import FiltroMembrosPorCurso from "./FiltroMembrosPorCurso";
import { getUsersWithPaginationAndFilter } from "@/app/lib/actions/user/getUsersWithPaginationAndFilter";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page = "1", search = "", cursoId, assinantes } = await searchParams;

  const session = await auth();

  console.log(session);

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
      assinantes:
        assinantes == undefined
          ? undefined
          : assinantes == "true"
          ? true
          : false,
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
          return { ...membro };
        })}
      />
    </div>
  );
}
