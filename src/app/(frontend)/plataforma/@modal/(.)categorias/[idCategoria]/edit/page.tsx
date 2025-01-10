import RoutingModal from "@/app/(frontend)/components/RoutingModal";
import React from "react";
import EditarCategoriaForm from "./EditarCategoriaForm";
import { appURL } from "@/app/lib/api/axios";

export default async function Page({
  params,
}: {
  params: Promise<{ idCategoria: string }>;
}) {
  const idCategoria = (await params).idCategoria;

  const categoria = await (
    await fetch(`${appURL}/api/categorias/${idCategoria}`)
  ).json();

  console.log(categoria);

  return (
    <RoutingModal>
      <EditarCategoriaForm
        initialValues={{ idCategoria, titulo: categoria.nome }}
      />
    </RoutingModal>
  );
}
