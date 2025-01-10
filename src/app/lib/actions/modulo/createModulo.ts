"use server";

import { revalidatePath } from "next/cache";
import { api } from "../../api/axios";

export async function createModulo(moduloData: { titulo; cursoId }) {
  await api.post("/api/modulos", {
    titulo: moduloData.titulo,
    cursoId: moduloData.cursoId,
  });

  revalidatePath(
    `/plataforma/conteudos/${moduloData.cursoId}?sidebar_small=true`
  );
  revalidatePath(`/plataforma/conteudos/${moduloData.cursoId}`);
}
