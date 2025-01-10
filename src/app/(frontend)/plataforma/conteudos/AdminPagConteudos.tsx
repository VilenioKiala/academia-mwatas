import React from "react";
import BannerSlider from "../../components/BannerSlider";
import H1 from "../../components/H1";
import PrimaryButton from "../../components/PrimaryButton";
import ConteudosPorCategoria from "./ConteudosPorCategoria";
import AddCategoriaModal from "./AddCategoriaModal";
import { IElementoBanner } from "@/app/(backend)/interfaces/objects/IElementoBanner";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { ICategoria } from "@/app/(backend)/interfaces/objects/ICategoria";
import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";

type AdminPagConteudoProps = {
  categorias: ICategoria[];
  cursos: ICurso[];
  elementosBanner: IElementoBanner[];
  userLogged: IUser;
};

export default async function AdminPagConteudo({
  categorias,
  cursos,
  elementosBanner,
  userLogged,
}: AdminPagConteudoProps) {
  return (
    <>
      <div className="grid grid-cols-12 px-5 lg:px-0">
        <div className="col-start-1 col-end-13 md:col-end-12 lg:col-end-10 flex flex-col">
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
              <div className="flex justify-between items-center">
                <H1>Conteúdos</H1>
                <AddCategoriaModal>
                  <PrimaryButton>Adicionar Categoria</PrimaryButton>
                </AddCategoriaModal>
              </div>

              {categorias.length == 0 && (
                <div className="flex justify-center items-center w-full my-5">
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
      </div>
    </>
  );
}
