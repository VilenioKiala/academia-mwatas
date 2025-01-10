"use server";

import { revalidatePath } from "next/cache";
import { api } from "../../api/axios";

export async function createCategoria(titulo: string) {
  await api.post("/api/categorias", {
    titulo,
  });

  revalidatePath("/plataforma/conteudos");
}
