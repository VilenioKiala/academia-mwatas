import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";
import { IModulo } from "@/app/(backend)/interfaces/objects/IModule";

export const countAulas = (curso: ICurso) => {
  let numero = 0;
  curso.modulos.map((modulo: IModulo) => (numero += modulo.videoAulas.length));
  return numero;
};
