import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";

export const calcDuracaoCurso = (curso: ICurso) => {
  let n = 0;

  curso.modulos.map((modulo) => {
    modulo.videoAulas.map((videoaula) => {
      n += videoaula.duracao;
    });
  });

  return n;
};
