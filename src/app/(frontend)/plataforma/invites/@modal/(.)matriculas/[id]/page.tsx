import H1 from "@/app/(frontend)/components/H1";
import RoutingModal from "@/app/(frontend)/components/RoutingModal";
import { appURL } from "@/app/lib/api/axios";
import React from "react";
import AdicionarMatriculaForm from "./AdicionarMatriculaForm";
import TabelaMatricula from "./TabelaMatricula";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  await (await fetch(`${appURL}/api/users/${id}`)).json();

  const cursos = await (await fetch(`${appURL}/api/cursos`)).json();

  const users = await (await fetch(`${appURL}/api/users/`)).json();

  return (
    <RoutingModal>
      <H1 className="mt-5">Controle de Matrículas</H1>
      <AdicionarMatriculaForm users={users} cursos={cursos} />
      <TabelaMatricula />
    </RoutingModal>
  );
}
