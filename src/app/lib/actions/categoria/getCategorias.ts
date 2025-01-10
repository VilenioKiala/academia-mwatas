"use server";

import { ICategoria } from "@/app/(backend)/interfaces/objects/ICategoria";
import { getAllCategoriasService } from "@/app/(backend)/services/categoria/GetAllCategorias";
import { cache } from "react";

export const getCategorias = cache(async function (): Promise<ICategoria[]> {
  const categorias = await getAllCategoriasService.get();

  return categorias;
});
