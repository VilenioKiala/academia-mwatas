import H1 from "@/app/(frontend)/components/H1";
import RoutingModal from "@/app/(frontend)/components/RoutingModal";
import React from "react";
import AdicionarMatriculaForm from "./AdicionarMatriculaForm";
import TabelaMatricula from "./TabelaMatricula";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { appURL } from "@/app/lib/api/axios";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const user: IUser = await (await fetch(`${appURL}/api/users/${id}`)).json();
  console.log("usuario clickado, ", user);

  const cursos = await (await fetch(`${appURL}/api/cursos`)).json();

  // const users: IUser[] = await (await fetch(`${appURL}/api/users/`)).json();

  return (
    <RoutingModal>
      <H1 className="mt-5">Controle de Matrículas</H1>
      <AdicionarMatriculaForm cursos={cursos} user={user} />
      <TabelaMatricula user={user} />
    </RoutingModal>
  );
}
