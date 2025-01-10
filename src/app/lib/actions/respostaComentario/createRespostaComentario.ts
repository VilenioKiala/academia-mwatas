import { api } from "../../api/axios";

export async function createRespostaComentario(
  texto: string,
  userId: string,
  comentarioId: string
) {
  await api.post("/api/respostascomentario", {
    texto: texto,
    userId,
    comentarioId,
  });
}
