import { api } from "../../api/axios";

type createMatriculaParams = {
  cursoId: string;
  userId: string;
};

export async function createMatricula({
  cursoId,
  userId,
}: createMatriculaParams) {
  await api.post("/api/matriculas", {
    usuarioId: userId,
    cursoId,
  });
}
