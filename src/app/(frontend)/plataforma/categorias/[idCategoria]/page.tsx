import BannerSlider from "@/app/(frontend)/components/BannerSlider";
import { auth } from "@/app/auth";
import { getCursos } from "@/app/lib/actions/curso/getCursos";
import { getOneUserId } from "@/app/lib/actions/user/getOneUserId";
import { appURL } from "@/app/lib/api/axios";
import { redirect, RedirectType } from "next/navigation";
import React from "react";
import H1 from "@/app/(frontend)/components/H1";
import Separator from "@/app/(frontend)/components/Separator";
import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";
import ContentCard from "@/app/(frontend)/components/ContentCard";
import { calcNumeroAulas } from "@/app/lib/functions/calcNumeroAulas";
import { getCategorias } from "@/app/lib/actions/categoria/getCategorias";
import RightSidebar from "../RightSidebar";
import { getFiveMateriaisComplementares } from "@/app/lib/actions/materialComplementar/getFiveMateriaisComplementares";
import SearchForm from "./SearchForm";
import { getOneCategoria } from "@/app/lib/actions/categoria/getOneCategoria";
import CursosPagination from "./CursosPagination";
import { getCursosWithPaginationAndFilter } from "@/app/lib/actions/curso/getCursosWithPaginationAndFilter";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ idCategoria: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const pageParam = (await searchParams).page;
  const page = pageParam ? Number(pageParam) : 1;
  const query = (await searchParams).search;
  const disponibilidade = (await searchParams).disponibilidade;

  const idCategoria = (await params).idCategoria;

  const session = await auth();

  if (!session?.user) {
    redirect("/signin", RedirectType.replace);
  }

  const userLogged = await getOneUserId(session?.user?.id);

  if (!userLogged) {
    redirect("/signin", RedirectType.replace);
  }

  const materiaisComplementares = await getFiveMateriaisComplementares();

  const categoria = await getOneCategoria(idCategoria);
  const categorias = await getCategorias();
  const bannerCursos = await getCursos({});
  const cursosFound = await getCursosWithPaginationAndFilter({
    filter: {
      categoriaId: idCategoria,
      query: (query && query.toString()) || undefined,
      disponibilidade: disponibilidade || undefined,
    },
    page: page,
    cursosPerPage: 1,
  });

  const elementosBanner = await (
    await fetch(`${appURL}/api/elementosbanner`)
  ).json();

  return (
    <>
      <div className="grid grid-cols-12 px-5 lg:px-0">
        <div className="col-start-1 col-end-13 md:col-end-12 lg:col-end-12 flex flex-col">
          <div>
            <BannerSlider
              elements={elementosBanner}
              cursos={bannerCursos.map((curso) => {
                return {
                  ...curso,
                };
              })}
              userLogged={{ ...userLogged }}
            />

            <div>
              <div className="mt-8 flex justify-between items-center">
                <div className="flex flex-col">
                  <small>Categoria</small>
                  <H1>{categoria.titulo}</H1>
                </div>
                <SearchForm initialValue={query ? query.toString() : ""} />
              </div>
            </div>
            <Separator className="mt-4 mb-8" />
          </div>

          {cursosFound.results.length == 0 && (
            <div className="flex justify-center items-center w-full my-5 mt-10">
              <p className="text-lg">Nenhum conteudo encontrado</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-x-6 gap-y-12 flex-wrap">
            {cursosFound.results.map((curso: ICurso) => {
              return (
                <>
                  <div key={curso.id} className="">
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
        </div>
        <RightSidebar
          materiaisComplementares={materiaisComplementares.map((material) => {
            return {
              ...material,
            };
          })}
          userLogged={{ ...userLogged }}
        />
      </div>
      {cursosFound.results.length > 0 && (
        <CursosPagination page={page} totalPages={cursosFound.totalPages} />
      )}
    </>
  );
}
