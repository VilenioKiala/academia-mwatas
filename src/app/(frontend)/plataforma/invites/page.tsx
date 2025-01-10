import React from "react";
import TabelaConvites from "./TabelaConvites";
import { redirect, RedirectType } from "next/navigation";
import { getOneUserId } from "@/app/lib/actions/user/getOneUserId";
import { auth } from "@/app/auth";

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
      <TabelaConvites userLogged={{ ...userLogged }} />;
    </div>
  );
}
