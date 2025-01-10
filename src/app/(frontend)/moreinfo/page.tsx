import { auth } from "@/app/auth";
import { getOneUserId } from "@/app/lib/actions/user/getOneUserId";
import { redirect, RedirectType } from "next/navigation";
import React from "react";
import MoreInfoCard from "./MoreInfoCard";

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
      <MoreInfoCard userLogged={{ ...userLogged }} />
    </div>
  );
}
