import { auth } from "@/app/auth";
import { getCursosWithPaginationAndFilter } from "@/app/lib/actions/curso/getCursosWithPaginationAndFilter";
import { getOneUserId } from "@/app/lib/actions/user/getOneUserId";
import { redirect, RedirectType } from "next/navigation";
import React from "react";
import H1 from "../../components/H1";
import Separator from "../../components/Separator";
import ContentCard from "../../components/ContentCard";
import { calcNumeroAulas } from "@/app/lib/functions/calcNumeroAulas";
import { getCategorias } from "@/app/lib/actions/categoria/getCategorias";
import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";
import { getUsersWithPaginationAndFilter } from "@/app/lib/actions/user/getUsersWithPaginationAndFilter";
import H3 from "../../components/H3";
import Link from "next/link";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import Avatar from "../../components/Avatar";
import { isAdminOrSuper } from "@/app/lib/functions/isAdminOrSuper";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin", RedirectType.replace);
  }

  const userLogged = await getOneUserId(session?.user?.id);

  if (!userLogged) {
    redirect("/signin", RedirectType.replace);
  }

  const search = (await searchParams).search.toString();

  const categorias = await getCategorias();
  const cursosFound = await getCursosWithPaginationAndFilter({
    filter: {
      query: search || undefined,
    },
    cursosPerPage: 6,
    page: 1,
  });

  const usersFound = await getUsersWithPaginationAndFilter({
    filter: {
      query: search || undefined,
    },
    usersPerPage: 6,
    page: 1,
  });

  return (
    <>
      <div className="grid grid-cols-12 px-5 lg:px-0">
        <div className="col-start-1 col-end-13 md:col-end-12 lg:col-end-12 flex flex-col">
          <div>
            <div>
              <div className="mt-8 flex justify-between items-center">
                <div className="flex flex-col">
                  <H1>Resultados da pesquisa &quot;{search}&quot;</H1>
                </div>
              </div>
            </div>
            <Separator className="mt-4 mb-8" />
          </div>

          <div className="flex justify-between w-full mb-3">
            <H3>Cursos</H3>
            <Link href="#">Ver Todos Os Cursos</Link>
          </div>
          {cursosFound.results.length == 0 && (
            <div className="flex justify-center items-center w-full my-5 mt-10">
              <p className="text-lg">Nenhum curso encontrado</p>
            </div>
          )}
          {cursosFound.results.length > 0 && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-x-6 gap-y-12 flex-wrap">
                {cursosFound.results.map((curso: ICurso) => {
                  return (
                    <>
                      <div key={curso.id}>
                        <ContentCard
                          curso={{ ...curso }}
                          numeroModulos={curso.modulos.length}
                          numeroAulas={calcNumeroAulas(curso)}
                          className="flex-1"
                          key={curso.id.toString()}
                          userLogged={{ ...userLogged }}
                          categorias={categorias.map((categoria) => {
                            return { ...categoria };
                          })}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          )}

          <div className="flex justify-between w-full mt-12 mb-3">
            <H3>Usuários</H3>
            <Link href="#">Ver Todos Os Cursos</Link>
          </div>

          {usersFound.results.length == 0 && (
            <div className="flex justify-center items-center w-full my-5 mt-10">
              <p className="text-lg">Nenhum curso encontrado</p>
            </div>
          )}

          {usersFound.results.length > 0 && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-x-6 gap-y-12 flex-wrap">
                {usersFound.results.map((user: IUser) => {
                  return (
                    <>
                      <div key={user.id}>
                        <div className="w-full h-fit flex flex-col items-center border border-black border-opacity-20 rounded-lg">
                          <div className="w-full h-52 bg-gray-100 relative"></div>
                          <Link href={`/plataforma/usuarios/${user.id}`}>
                            <Avatar
                              className="p-20 mt-[-6rem] relative z-10"
                              foto={user.profilePic as string}
                            />
                            <p className="capitalize text-center text-xl font-semibold mt-3">
                              {user.nome} {user.sobrenome}
                            </p>
                            <p className="text-center mb-4">
                              @{user.nomeUsuario}
                            </p>
                          </Link>

                          <div className="flex flex-col gap-2">
                            {user.genero && (
                              <p className="text-center">
                                Genero: {user.genero}
                              </p>
                            )}

                            {user.dataNascimento && (
                              <p className="text-center">
                                {new Date(user.dataNascimento).getDate()}/
                                {new Date(user.dataNascimento).getMonth()}/
                                {new Date(user.dataNascimento).getFullYear()}{" "}
                                <span className="font-semibold">{` (${
                                  new Date().getFullYear() -
                                  new Date(user.dataNascimento).getFullYear()
                                } anos)`}</span>
                              </p>
                            )}

                            {isAdminOrSuper(userLogged) &&
                              user.numeroTelefone && (
                                <p className="text-center">
                                  +244 {` ${user.numeroTelefone}`}
                                </p>
                              )}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
      {/* <RightSidebar
          materiaisComplementares={materiaisComplementares.map((material) => {
            return {
              ...material,
            };
          })}
          userLogged={{ ...userLogged }}
        /> */}
    </>
  );
}
