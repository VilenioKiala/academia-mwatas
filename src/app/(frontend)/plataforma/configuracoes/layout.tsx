import React from "react";
import Avatar from "../../components/Avatar";
import H3 from "../../components/H3";
import LinkList from "./LinkList";
import { auth } from "@/app/auth";
import { redirect, RedirectType } from "next/navigation";
import { getOneUserId } from "@/app/lib/actions/user/getOneUserId";

export default async function ConfiguracoesLayout({
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
        <div className="col-start-1 col-end-13 md:col-end-12 lg:col-end-12 flex flex-col px-2 lg:px-0">
          <div>
            <div className="mt-8">
              <div className="flex items-center gap-3 text-foreground">
                <Avatar foto={userLogged.profilePic} className="p-8" />
                <div className="text-foreground">
                  <H3 className="font-medium">
                    @{userLogged.nomeUsuario} -{" "}
                    <span className="capitalize">
                      {userLogged.nome} {userLogged.sobrenome}
                    </span>
                  </H3>
                  <p>
                    Gerencie as informações de conta, dados pessoais e
                    configurações de layout
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 mt-12 gap-8 justify-center w-full">
                <LinkList userLogged={{ ...userLogged }} />
                <div>{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal}
    </>
  );
}
