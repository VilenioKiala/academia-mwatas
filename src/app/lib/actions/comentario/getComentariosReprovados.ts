"use server";
import { getAllComentariosService } from "@/app/(backend)/services/comentario/GetAllComentarios";

export async function getComentariosReprovados() {
  const comentarios = await getAllComentariosService.get({
    lido: true,
    reprovado: true,
  });

  return comentarios;
}
