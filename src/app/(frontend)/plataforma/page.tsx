import React from "react";
import RightSidebar from "./conteudos/RightSidebar";
import BannerSlider from "../components/BannerSlider";
import { auth } from "@/app/auth";
import { redirect, RedirectType } from "next/navigation";
import { getOneUserId } from "@/app/lib/actions/user/getOneUserId";
import { getCursos } from "@/app/lib/actions/curso/getCursos";
import { getAllVideoAulas } from "@/app/lib/actions/aula/getAllVideoAulas";
import { getFiveMateriaisComplementares } from "@/app/lib/actions/materialComplementar/getFiveMateriaisComplementares";
import H1 from "../components/H1";
import CardEstatistica from "../components/CardEstatistica";
import TabelaCursosAFazer from "./TabelaCursosAFazer";
import CursoCardSlider from "./CursoCardSlider";
import { getCategorias } from "@/app/lib/actions/categoria/getCategorias";
import { isAluno, isProfessor } from "@/app/lib/functions/isAdminOrSuper";
import { countCursosCompletos } from "@/app/lib/functions/countCursosCompletos";
import { countCursosEmProgresso } from "@/app/lib/functions/countCursosEmProgresso";
import { getAllElementosBanner } from "@/app/lib/actions/elementosBanner/getAllElementosBanner";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin", RedirectType.replace);
  }

  const userLogged = await getOneUserId(session?.user?.id);

  if (!userLogged) {
    redirect("/signin", RedirectType.replace);
  }

  let videoAulas;
  let materiaisComplementares;

  const cursos = await getCursos({});
  const cursosRecomendados = await getCursos({ take: 4 });

  const categorias = await getCategorias();

  const elementosBanner = await getAllElementosBanner();

  if (isAluno(userLogged) || isProfessor(userLogged)) {
    videoAulas = await getAllVideoAulas();
    materiaisComplementares = await getFiveMateriaisComplementares();
  }

  return (
    <>
      <div
        style={{
          gridTemplateColumns: "repeat(16, minmax(0, 1fr))",
        }}
        className="grid 
        gap-10 lg:px-5 px-0 overflow-x-hidden text-foreground"
      >
        <div className="col-start-1 col-end-[17] md:col-end-[14] lg:col-end-[13] flex flex-col">
          <div>
            <BannerSlider
              elements={elementosBanner.map((elemento) => {
                return { ...elemento };
              })}
              cursos={cursos.map((curso) => {
                return {
                  ...curso,
                };
              })}
              userLogged={{ ...userLogged }}
            />

            <div className="mt-8">
              <div className="flex justify-between items-center text-foreground">
                <H1>Home</H1>
              </div>

              <div className="grid grid-cols-1 2xl:grid-cols-2 3xl:grid-cols-3 gap-5 mt-4">
                <CardEstatistica
                  num={countCursosCompletos(userLogged)}
                  titulo="Cursos Completos"
                />
                <CardEstatistica
                  num={countCursosEmProgresso(userLogged)}
                  titulo="Cursos em Progresso"
                />
                <CardEstatistica
                  num={userLogged.certificados.length}
                  titulo="Certificados Ganhos"
                />
              </div>
            </div>

            <div className="mt-16">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-medium">
                  Curso a fazer no momento
                </h2>
              </div>

              <TabelaCursosAFazer userLogged={{ ...userLogged }} />
            </div>

            {cursosRecomendados.length > 0 && (
              <div className="mt-16">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-medium">Recomendamos para si</h2>
                </div>

                <CursoCardSlider
                  userLogged={{ ...userLogged }}
                  categorias={[
                    ...categorias.map((categoria) => {
                      return { ...categoria };
                    }),
                  ]}
                  cursos={cursosRecomendados.map((curso) => {
                    return { ...curso };
                  })}
                />
              </div>
            )}
          </div>
        </div>

        <RightSidebar
          userLogged={{ ...userLogged }}
          videoAulas={videoAulas.map((videoAula) => {
            return { ...videoAula };
          })}
          materiaisComplementares={materiaisComplementares.map(
            (materialComplementar) => {
              return { ...materialComplementar };
            }
          )}
        />
      </div>
    </>
  );
}
