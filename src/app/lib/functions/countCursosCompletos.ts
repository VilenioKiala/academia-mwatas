import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { countAulas } from "./countAulas";
import { countAulasAssistidas } from "./countAulasAssistidas";

export function countCursosCompletos(user: IUser) {
  let n = 0;

  user.matriculas.map((matricula) => {
    const totalAulas = countAulas(matricula.curso);
    const totalAulasAssistidas = countAulasAssistidas(matricula.curso, user);

    if (totalAulas == totalAulasAssistidas) {
      n += 1;
    }
  });

  return n;
}
