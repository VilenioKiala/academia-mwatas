import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";

export function calcNumeroAulas(curso: ICurso) {
  let qtd = 0;

  curso.modulos.map((modulo) => {
    modulo.videoAulas.map(() => {
      qtd += 1;
    });
  });

  return qtd;
}
