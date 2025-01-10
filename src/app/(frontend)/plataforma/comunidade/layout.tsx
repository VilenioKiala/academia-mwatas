"use client";

import React from "react";
import H1 from "../../components/H1";
import { usePathname } from "next/navigation";
import PrimaryButton from "../../components/PrimaryButton";
import Link from "next/link";

export default function ComunidadeLayout({
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
                <H1>Comunidade</H1>
                <Link href="/plataforma/membros/create">
                  <PrimaryButton>Marcar todos como lido</PrimaryButton>
                </Link>
              </div>

              <div className="flex w-full justify-center mt-8">
                <Link
                  href={"/plataforma/comunidade"}
                  className={`flex-1 text-center p-3 ${
                    pathname == "/plataforma/comunidade" &&
                    "border-b-1 border-b-myblue text-myblue"
                  }`}
                >
                  Não Lidos
                </Link>
                <Link
                  href={"/plataforma/comunidade/aprovados"}
                  className={`flex-1 text-center p-3 ${
                    pathname == "/plataforma/comunidade/aprovados" &&
                    "border-b-1 border-b-myblue text-myblue"
                  }`}
                >
                  Aprovados
                </Link>
                <Link
                  href={"/plataforma/comunidade/reprovados"}
                  className={`flex-1 text-center p-3 ${
                    pathname == "/plataforma/comunidade/reprovados" &&
                    "border-b-1 border-b-myblue text-myblue"
                  }`}
                >
                  Reprovados
                </Link>
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
