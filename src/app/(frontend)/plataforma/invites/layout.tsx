"use client";

import React from "react";
import H1 from "../../components/H1";
import PrimaryButton from "../../components/PrimaryButton";
import Link from "next/link";

export default function MembrosLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-start-1 col-end-13 md:col-end-12 lg:col-end-10 flex flex-col px-5 lg:px-0">
          <div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <H1>Convites</H1>
                <Link href="/plataforma/invites/create">
                  <PrimaryButton>Criar Convite</PrimaryButton>
                </Link>
              </div>

              <div className="w-full">{children}</div>
            </div>
          </div>
        </div>
      </div>
      {modal}
    </>
  );
}
