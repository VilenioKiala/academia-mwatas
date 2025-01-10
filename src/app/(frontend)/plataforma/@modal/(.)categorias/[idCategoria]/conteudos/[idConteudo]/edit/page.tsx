import RoutingModal from "@/app/(frontend)/components/RoutingModal";
import React from "react";
import EditarCursoForm from "./EditarCursoForm";
import { appURL } from "@/app/lib/api/axios";

export default async function Page({
  params,
}: {
  params: Promise<{ idConteudo: string }>;
}) {
  const idConteudo = (await params).idConteudo;

  const conteudo = await (
    await fetch(`${appURL}/api/cursos/${idConteudo}`)
  ).json();

  const categorias = await (await fetch(`${appURL}/api/categorias/`)).json();

  return (
    <RoutingModal>
      <EditarCursoForm
        initialValues={{
          coverCurso: conteudo.coverCurso,
          fraseDestaque: conteudo.fraseDestaque,
          categoriaId: conteudo.categoriaId,
          preco: conteudo.preco,
          sobreOCurso: conteudo.sobreOCurso,
          titulo: conteudo.titulo,
          idConteudo: idConteudo,
        }}
        categorias={categorias}
      />
    </RoutingModal>
  );
}
