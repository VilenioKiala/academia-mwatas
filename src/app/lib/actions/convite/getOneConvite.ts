"use server";

import { getOneConviteService } from "@/app/(backend)/services/convite/GetOneConvite";
import { cache } from "react";

export const getOneConvite = cache(async function (id: string) {
  const convite = await getOneConviteService.get(id);

  return convite;
});
