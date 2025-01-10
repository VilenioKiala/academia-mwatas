import { auth } from "@/app/auth";
import { getOneConvite } from "@/app/lib/actions/convite/getOneConvite";
import { getOneUserId } from "@/app/lib/actions/user/getOneUserId";
import { appURL } from "@/app/lib/api/axios";
import { redirect } from "next/dist/server/api-utils";
import { RedirectType } from "next/navigation";
import React from "react";

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
  const convite = await getOneConvite(id);

  return (
    <div className="grid grid-cols-2">
      <div>{convite.textoDestaque}</div>
      <div className="relative">
        <div
          className="fixed w-full h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url(${appURL}/storage/images/convite/${convite.imagem})`,
          }}
        ></div>
      </div>
    </div>
  );
}
