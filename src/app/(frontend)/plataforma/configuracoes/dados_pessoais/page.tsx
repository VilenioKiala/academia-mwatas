import UserIcon from "@/app/(frontend)/icons/UserIcon";
import React from "react";
import DadosPessoaisForm from "./DadosPessoaisForm";
import { redirect, RedirectType } from "next/navigation";
import { auth } from "@/app/auth";
import { getOneUserId } from "@/app/lib/actions/user/getOneUserId";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin", RedirectType.replace);
  }

  const userLogged = await getOneUserId(session?.user?.id);

  if (!userLogged) {
    redirect("/signin", RedirectType.replace);
  }

  return (
    <div>
      <div className="flex gap-3 items-center">
        <UserIcon width={"2em"} height={"2em"} fill="#1F68B2" />
        <h4 className="font-semibold text-myblue">Dados Pessoais</h4>
      </div>
      <DadosPessoaisForm userLogged={{ ...userLogged }} />
    </div>
  );
}
