import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import H3 from "@/app/(frontend)/components/H3";
import Separator from "@/app/(frontend)/components/Separator";
import { appURL } from "@/app/lib/api/axios";
import React from "react";
import AddSobreModal from "./AddSobreModal";
import PrimaryButton from "@/app/(frontend)/components/PrimaryButton";
import { Button } from "@nextui-org/button";
import EditIcon from "@/app/(frontend)/icons/EditIcon";
import CertificadoCard from "@/app/(frontend)/components/CertificadoCard";
import { auth } from "@/app/auth";
import { redirect, RedirectType } from "next/navigation";
import { getOneUserId } from "@/app/lib/actions/user/getOneUserId";
import { isAdminOrSuper } from "@/app/lib/functions/isAdminOrSuper";
import CardEstatistica from "@/app/(frontend)/components/CardEstatistica";
import { countCursosCompletos } from "@/app/lib/functions/countCursosCompletos";
import { countCursosEmProgresso } from "@/app/lib/functions/countCursosEmProgresso";
import UserCard from "./UserCard";
import { countCursosMatriculadosNoMomento } from "@/app/lib/functions/countCursosMatriculadosNoMomento";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin", RedirectType.replace);
  }

  const userLogged = await getOneUserId(session?.user?.id);

  if (!userLogged) {
    redirect("/signin", RedirectType.replace);
  }

  const id = (await params).id;

  const user: IUser = await (await fetch(`${appURL}/api/users/${id}`)).json();

  return (
    <div className="w-full px-2 md:px-16 lg:px-24">
      <div className="mt-16 grid grid-cols-4 gap-20">
        <UserCard user={{ ...user }} userLogged={{ ...userLogged }} />
        <div className="w-full col-start-1 xl:col-start-3 2xl:col-start-2 col-span-full flex flex-col gap-8">
          <div className="flex flex-col gap-2 border-1 border-black border-opacity-20 bg-gray-50 dark:bg-gray-900 p-8">
            <div className="flex justify-between">
              <H3>Sobre o aluno</H3>
              <AddSobreModal userLogged={{ ...userLogged }}>
                <Button variant="ghost" className="rounded-md">
                  <EditIcon width={"1.6em"} height={"1.6em"} />
                </Button>
              </AddSobreModal>
            </div>
            <Separator />
            <div className="flex flex-col gap-4 mt-5 justify-center">
              {userLogged.sobre?.trim().length > 0 ? (
                <p>{userLogged.sobre}</p>
              ) : (
                <>
                  <p className="text-center">
                    Fale mais sobre você, fale sobre a sua personalidade,
                    desejos e objectivos aqui na plataforma!
                  </p>

                  <AddSobreModal userLogged={{ ...userLogged }}>
                    <PrimaryButton>Adicionar Bio</PrimaryButton>
                  </AddSobreModal>
                </>
              )}
            </div>
          </div>
          {isAdminOrSuper(userLogged) && (
            <>
              <div className="flex flex-col gap-2">
                <H3>Certificados</H3>
                <Separator />
                {userLogged.certificados.length == 0 && (
                  <p className="text-center mt-4">
                    Não há nenhum certificado deste usuário
                  </p>
                )}
                <div className="grid grid-cols-3">
                  {userLogged.certificados.map((certificado) => {
                    return (
                      <CertificadoCard
                        userLogged={userLogged}
                        key={certificado.id}
                        nomeCurso={certificado.curso.titulo}
                        nomeUsuario={certificado.usuario.nomeUsuario}
                        sobrenome={certificado.usuario.sobrenome}
                        imagem={certificado.imagem}
                        cursoId={certificado.cursoId}
                        nome={certificado.usuario.nome}
                        id={certificado.id}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col gap-2">
            <H3>Visão Geral</H3>
            <Separator />
            <div className="grid grid-cols-1 2xl:grid-cols-2 3xl:grid-cols-3 gap-5 mt-4">
              <CardEstatistica
                num={countCursosCompletos(user)}
                titulo="Cursos Completos"
              />
              <CardEstatistica
                num={countCursosEmProgresso(user)}
                titulo="Cursos em Progresso"
              />
              <CardEstatistica
                num={userLogged.certificados.length}
                titulo="Certificados Ganhos"
              />

              <CardEstatistica
                num={countCursosMatriculadosNoMomento(user)}
                titulo="Cursos Matriculados No Momento"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
