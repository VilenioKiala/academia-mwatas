import H1 from "@/app/(frontend)/components/H1";
import RoutingModal from "@/app/(frontend)/components/RoutingModal";
import React from "react";
import EmitirCertificadoForm from "./EmitirCertificadoForm";
import { appURL } from "@/app/lib/api/axios";

export default async function Page() {
  const users = await (
    await fetch(`${appURL}/api/users?privilegio=aluno`)
  ).json();
  const cursos = await (await fetch(`${appURL}/api/cursos`)).json();

  return (
    <RoutingModal>
      <H1 className="mt-4 ml-4">Emitir Certificado</H1>
      <EmitirCertificadoForm users={users} cursos={cursos} />
    </RoutingModal>
  );
}
