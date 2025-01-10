import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";

export function countAulasAssistidas(curso: ICurso, userLogged: IUser) {
  let numero = 0;
  curso.modulos.map((modulo) =>
    modulo.videoAulas.map((videoaula) => {
      videoaula.visualizacoes.map((visualizacao) => {
        if (visualizacao.userId == userLogged.id) {
          numero += 1;
        }
      });
    })
  );
  return numero;
}
