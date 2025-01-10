"use server";

import { ICategoria } from "@/app/(backend)/interfaces/objects/ICategoria";
import { getOneCategoriaService } from "@/app/(backend)/services/categoria/GetOneCategoria";
import { cache } from "react";

export const getOneCategoria = cache(async function (
  id: string
): Promise<ICategoria> {
  const categoria = await getOneCategoriaService.get(id);

  return categoria;
});
