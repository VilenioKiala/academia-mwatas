"use server";

import { getOneUserService } from "@/app/(backend)/services/user/GetOneUser";
import { redirect, RedirectType } from "next/navigation";
import { cache } from "react";

export const getOneUserId = cache(async function (id: string) {
  const user = await getOneUserService.get(id);

  if (!user) {
    redirect("/signin", RedirectType.replace);
  }

  return user;
});
