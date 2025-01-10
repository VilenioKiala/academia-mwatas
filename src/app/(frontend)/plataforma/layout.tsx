import React from "react";
import Sidebar from "../components/Sidebar";
import Nav from "../components/Nav";
import { redirect, RedirectType } from "next/navigation";
import { getOneUserId } from "@/app/lib/actions/user/getOneUserId";
import { auth } from "@/app/auth";
import PlataformaContainer from "../components/PlataformaContainer";

export default async function PlataformaLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/signin", RedirectType.replace);
  }

  const userLogged = await getOneUserId(session?.user?.id);

  if (!userLogged) {
    redirect("/signin", RedirectType.replace);
  }

  return (
    <>
      <PlataformaContainer className="flex h-screen text-white">
        <Sidebar
          userLogged={{ ...userLogged }}
          style={{
            border: "0.5px solid rgba(0, 0, 0, 0.32)",
            boxShadow: "5px -2px 4px rgba(0, 0, 0, 0.08)",
            borderRadius: "0px 24px 24px 0px",
          }}
          className="min-w-fit"
        />

        <div className="flex-1 overflow-y-scroll px-8 lg:px-0 lg:pr-8 relative">
          <Nav
            userLogged={{ ...userLogged }}
            navProps={{
              className:
                "flex items-center fixed top-0 left-0 w-[99%] bg-white",
            }}
          />
          <div className="mt-28 mb-40">{children}</div>
        </div>
        {modal}
      </PlataformaContainer>
      {/* <div className="w-full h-screen grid grid-cols-16">
        <div className="col-start-1 col-end-4">
          <Sidebar
            style={{
              border: "0.5px solid rgba(0, 0, 0, 0.32)",
              boxShadow: "5px -2px 4px rgba(0, 0, 0, 0.08)",
              borderRadius: "0px 24px 24px 0px",
            }}
          />
        </div>

        <div>
          <div className="grid grid-cols-12 w-full">
            <div className="col-start-1 lg:col-start-3 col-end-13 flex flex-col">
              <div className="mt-24 w-full">{children}</div>
            </div>
          </div>
        </div>

        <Nav
          navProps={{
            className: "flex items-center fixed top-0 left-0 w-full bg-white",
          }}
          nome={user.nome}
          sobrenome={user.sobrenome}
          username={user.nomeUsuario}
        />
        {modal}
      </div> */}
    </>
  );
}
