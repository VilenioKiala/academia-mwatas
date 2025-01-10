"use server";

import { getOneVideoAulaService } from "@/app/(backend)/services/videoaula/GetOneVideoAula";

export async function getOneVideoAula(id: string) {
  const data = await getOneVideoAulaService.get(id);

  return { ...data };
}
