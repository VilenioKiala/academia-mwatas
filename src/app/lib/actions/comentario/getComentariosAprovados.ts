"use server";
import { getAllComentariosService } from "@/app/(backend)/services/comentario/GetAllComentarios";

export async function getComentariosAprovados() {
  const comentarios = await getAllComentariosService.get({
    lido: true,
    reprovado: false,
  });

  return comentarios;
}
