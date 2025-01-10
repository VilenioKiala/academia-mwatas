import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { isMatriculadoOrMatriculaNotExpired } from "./isMatriculadoOrMatriculaNotExpired.ts";

export function countCursosMatriculadosNoMomento(user: IUser) {
  let n = 0;

  user.matriculas.map((matricula) => {
    if (isMatriculadoOrMatriculaNotExpired(matricula.curso, user)) {
      n += 1;
    }
  });

  return n;
}
