import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { countAulas } from "./countAulas";
import { countAulasAssistidas } from "./countAulasAssistidas";
import { isMatriculadoOrMatriculaNotExpired } from "./isMatriculadoOrMatriculaNotExpired.ts";

export function countCursosEmProgresso(user: IUser) {
  let n = 0;

  user.matriculas.map((matricula) => {
    if (isMatriculadoOrMatriculaNotExpired(matricula.curso, user)) {
      const totalAulas = countAulas(matricula.curso);
      const totalAulasAssistidas = countAulasAssistidas(matricula.curso, user);

      if (totalAulas !== totalAulasAssistidas) {
        n += 1;
      }
    }
  });

  return n;
}
