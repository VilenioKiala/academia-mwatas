import RoutingModal from "@/app/(frontend)/components/RoutingModal";
import { apiUrl, appURL } from "@/app/lib/api/axios";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const certificado = await (
    await fetch(`${appURL}/api/certificados/${id}`)
  ).json();

  return (
    <RoutingModal className="sm:max-w-full">
      <div className="flex flex-col">
        <div
          className="w-full h-svh flex-1 bg-cover bg-center"
          style={{
            backgroundImage: `url(${apiUrl}/storage/images/certificados/${certificado.imagem})`,
          }}
        ></div>

        <div className="mt-4">
          <p>
            <span className="font-semibold">Aluno:</span> @
            {certificado.usuario.nomeUsuario} - {certificado.usuario.nome}{" "}
            {certificado.usuario.sobrenome}
          </p>
          <p>
            <span className="font-semibold">Curso:</span>{" "}
            {certificado.curso.titulo}
          </p>
        </div>
      </div>
    </RoutingModal>
  );
}
