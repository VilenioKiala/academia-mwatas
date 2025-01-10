"use client";

import React from "react";
import H1 from "../../components/H1";
import { usePathname } from "next/navigation";
import PrimaryButton from "../../components/PrimaryButton";
import AddMembroModal from "./AddMembroModal";
import Link from "next/link";

export default function MembrosLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-start-1 col-end-13 md:col-end-12 lg:col-end-10 flex flex-col px-5 lg:px-0">
          <div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <H1>Membros</H1>
                <AddMembroModal>
                  <PrimaryButton>Adicionar Usuário</PrimaryButton>
                </AddMembroModal>
              </div>

              <div className="flex w-full justify-center mt-8">
                <Link
                  href={"/plataforma/membros"}
                  className={`flex-1 text-center p-3 ${
                    pathname == "/plataforma/membros" &&
                    "border-b-1 border-b-myblue text-myblue"
                  }`}
                >
                  Todos
                </Link>
                <Link
                  href={"/plataforma/membros/assinantes"}
                  className={`flex-1 text-center p-3 ${
                    pathname == "/plataforma/membros/assinantes" &&
                    "border-b-1 border-b-myblue text-myblue"
                  }`}
                >
                  Assinantes
                </Link>
                <Link
                  href={"/plataforma/membros/naoassinantes"}
                  className={`flex-1 text-center p-3 ${
                    pathname == "/plataforma/membros/naoassinantes" &&
                    "border-b-1 border-b-myblue text-myblue"
                  }`}
                >
                  Não Assinantes
                </Link>
                {/* <Link
                  href={"/plataforma/membros/bloqueados"}
                  className={`flex-1 text-center p-3 ${
                    pathname == "/plataforma/membros/bloqueados" &&
                    "border-b-1 border-b-myblue text-myblue"
                  }`}
                >
                  Bloqueados
                </Link> */}
              </div>

              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
      {modal}
    </>
  );
}
