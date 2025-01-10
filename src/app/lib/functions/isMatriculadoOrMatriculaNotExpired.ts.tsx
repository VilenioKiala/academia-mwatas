import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { parseAbsoluteToLocal } from "@internationalized/date";

export function isMatriculadoOrMatriculaNotExpired(curso: ICurso, user: IUser) {
  const matriculas = curso.matriculas.filter(
    (matricula) => matricula.userId == user.id
  );

  return matriculas.length == 0
    ? false
    : !matriculas[0].dataExpiracao ||
      parseAbsoluteToLocal(
        new Date(matriculas[0].dataExpiracao).toISOString()
      ).compare(parseAbsoluteToLocal(new Date().toISOString())) > 0
    ? true
    : false;
}
