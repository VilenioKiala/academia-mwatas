"use server";
import { getAllComentariosService } from "@/app/(backend)/services/comentario/GetAllComentarios";

export async function getComentariosNaoLidos() {
  const comentarios = await getAllComentariosService.get({ lido: false });

  return comentarios;
}
