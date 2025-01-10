import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";

export function countMateriaisComplementaresCurso(curso: ICurso) {
  let n = 0;

  curso.modulos.map((modulo) => {
    modulo.videoAulas.map((videoAula) => {
      videoAula.materiaisComplementares.map(() => {
        n += 1;
      });
    });
  });

  return n;
}
