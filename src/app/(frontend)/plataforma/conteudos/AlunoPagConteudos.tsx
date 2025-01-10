"use client";

import React from "react";
import BannerSlider from "../../components/BannerSlider";
import H1 from "../../components/H1";
import ConteudosPorCategoria from "./ConteudosPorCategoria";
import { IElementoBanner } from "@/app/(backend)/interfaces/objects/IElementoBanner";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { IVideoAula } from "@/app/(backend)/interfaces/objects/IVideoAula";
import RightSidebar from "./RightSidebar";
import { IMaterialComplementar } from "@/app/(backend)/interfaces/objects/IMaterialComplementar";
import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";
import { ICategoria } from "@/app/(backend)/interfaces/objects/ICategoria";

type AlunoPagConteudoProps = {
  categorias: ICategoria[];
  cursos: ICurso[];
  elementosBanner: IElementoBanner[];
  userLogged: IUser;
  videoAulas: IVideoAula[];
  materiaisComplementares: IMaterialComplementar[];
};

export default function AlunoPagConteudos({
  materiaisComplementares,
  videoAulas,
  categorias,
  cursos,
  userLogged,
  elementosBanner,
}: AlunoPagConteudoProps) {
  return (
    <>
      <div
        style={{
          gridTemplateColumns: "repeat(16, minmax(0, 1fr))",
        }}
        className="grid gap-10 px-5 lg:px-0"
      >
        <div className="col-start-1 col-end-[16] md:col-end-[14] lg:col-end-[13] flex flex-col">
          <div>
            <BannerSlider
              elements={elementosBanner}
              cursos={cursos.map((curso) => {
                return {
                  ...curso,
                };
              })}
              userLogged={{ ...userLogged }}
            />

            <div className="mt-8">
              <div className="flex justify-between items-center text-foreground">
                <H1>Conteúdos</H1>
              </div>

              {categorias.length == 0 && (
                <div className="flex justify-center items-center w-full my-5 text-foreground">
                  <p className="text-lg">
                    Não há nenhuma categoria de cursos registada
                  </p>
                </div>
              )}
              {categorias.map((categoria: ICategoria) => {
                return (
                  <ConteudosPorCategoria
                    key={categoria.id}
                    userLogged={{ ...userLogged }}
                    categoria={{ ...categoria }}
                    categorias={categorias.map((categoria) => {
                      return { ...categoria };
                    })}
                  />
                );
              })}
            </div>
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
