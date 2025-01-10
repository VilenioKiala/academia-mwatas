import React from "react";
import H3 from "../../components/H3";
import { ICertificado } from "@/app/(backend)/interfaces/objects/ICertificado";
import CertificadoCard from "../../components/CertificadoCard";
import { appURL } from "@/app/lib/api/axios";
import { auth } from "@/app/auth";
import { redirect, RedirectType } from "next/navigation";
import { getOneUserId } from "@/app/lib/actions/user/getOneUserId";
import { isAdminOrSuper } from "@/app/lib/functions/isAdminOrSuper";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin", RedirectType.replace);
  }

  const userLogged = await getOneUserId(session?.user?.id);

  if (!userLogged) {
    redirect("/signin", RedirectType.replace);
  }

  let certificados;

  if (isAdminOrSuper(userLogged)) {
    certificados = await (await fetch(`${appURL}/api/certificados`)).json();
  } else {
    certificados = userLogged.certificados;
  }

  return (
    <div>
      {certificados.length == 0 && (
        <H3 className="text-center mt-10">
          Não há nenhum certificado emitido até o momento
        </H3>
      )}
      <div className="w-full grid grid-cols-3">
        {certificados.map((certificado: ICertificado) => {
          return (
            <>
              <div key={certificado.id}>
                <CertificadoCard
                  nome={certificado.usuario.nome}
                  nomeUsuario={certificado.usuario.nomeUsuario}
                  sobrenome={certificado.usuario.sobrenome}
                  nomeCurso={certificado.curso.titulo}
                  imagem={certificado.imagem}
                  id={certificado.id}
                  cursoId={certificado.cursoId}
                  userLogged={{ ...userLogged }}
                />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
