import React from "react";
import H1 from "../../components/H1";
import PrimaryButton from "../../components/PrimaryButton";
import Link from "next/link";
import Separator from "../../components/Separator";
import { redirect, RedirectType } from "next/navigation";
import { auth } from "@/app/auth";
import { getOneUserId } from "@/app/lib/actions/user/getOneUserId";
import { isAdminOrSuper } from "@/app/lib/functions/isAdminOrSuper";

export default async function CertificadosLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin", RedirectType.replace);
  }

  const userLogged = await getOneUserId(session?.user?.id);

  if (!userLogged) {
    redirect("/signin", RedirectType.replace);
  }

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-start-1 col-end-13 md:col-end-12 lg:col-end-10 flex flex-col px-5 lg:px-0">
          <div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <H1>Certificados</H1>
                {isAdminOrSuper(userLogged) && (
                  <Link href="/plataforma/certificados/create">
                    <PrimaryButton>Emitir Certificado</PrimaryButton>
                  </Link>
                )}
              </div>
              <Separator className="mt-4 mb-8" />

              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
      {modal}
    </>
  );
}
