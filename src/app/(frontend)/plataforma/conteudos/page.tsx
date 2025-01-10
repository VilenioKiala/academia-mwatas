import React from "react";
import { appURL } from "@/app/lib/api/axios";
import { getCategorias } from "@/app/lib/actions/categoria/getCategorias";
import { getCursos } from "@/app/lib/actions/curso/getCursos";
import AdminPagConteudo from "./AdminPagConteudos";
import AlunoPagConteudos from "./AlunoPagConteudos";
import { IElementoBanner } from "@/app/(backend)/interfaces/objects/IElementoBanner";
import { getAllVideoAulas } from "@/app/lib/actions/aula/getAllVideoAulas";
import { getFiveMateriaisComplementares } from "@/app/lib/actions/materialComplementar/getFiveMateriaisComplementares";
import { auth } from "@/app/auth";
import { redirect, RedirectType } from "next/navigation";
import { getOneUserId } from "@/app/lib/actions/user/getOneUserId";

export const revalidate = 30;

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin", RedirectType.replace);
  }

  const userLogged = await getOneUserId(session?.user?.id);

  if (!userLogged) {
    redirect("/signin", RedirectType.replace);
  }

  let videoaulas;
  let materiaisComplementares;
  const categorias = await getCategorias();
  const cursos = await getCursos({});

  const elementosBanner = await (
    await fetch(`${appURL}/api/elementosbanner`)
  ).json();

  if (
    userLogged.privilegio.toLowerCase() == "aluno" ||
    userLogged.privilegio.toLowerCase() == "admin"
  ) {
    videoaulas = await getAllVideoAulas();
    materiaisComplementares = await getFiveMateriaisComplementares();
  }

  return (
    <>
      {userLogged.privilegio.toLowerCase() == "admin" ||
      userLogged.privilegio.toLowerCase() == "superadmin" ? (
        <AdminPagConteudo
          userLogged={{ ...userLogged }}
          categorias={categorias.map((categoria) => {
            return { ...categoria };
          })}
          cursos={cursos.map((curso) => {
            return { ...curso };
          })}
          elementosBanner={elementosBanner.map(
            (elementoBanner: IElementoBanner) => {
              return { ...elementoBanner };
            }
          )}
        />
      ) : (
        <AlunoPagConteudos
          userLogged={{ ...userLogged }}
          categorias={categorias.map((categoria) => {
            return { ...categoria };
          })}
          cursos={cursos.map((curso) => {
            return { ...curso };
          })}
          elementosBanner={elementosBanner.map(
            (elementoBanner: IElementoBanner) => {
              return { ...elementoBanner };
            }
          )}
          videoAulas={videoaulas.map((videoaula) => {
            return { ...videoaula };
          })}
          materiaisComplementares={materiaisComplementares.map(
            (materialComplementar) => {
              return { ...materialComplementar };
            }
          )}
        />
      )}
    </>
  );
}
