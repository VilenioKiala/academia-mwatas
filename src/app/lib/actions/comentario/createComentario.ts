import { api } from "../../api/axios";

export async function createComentario(
  texto: string,
  userId: string,
  videoAulaId: string
) {
  const comentarioCreated = await api.post("/api/comentarios", {
    texto,
    userId,
    videoAulaId,
  });

  return comentarioCreated;
}
