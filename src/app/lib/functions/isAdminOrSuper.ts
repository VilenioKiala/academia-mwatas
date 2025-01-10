import { IUser } from "@/app/(backend)/interfaces/objects/IUser";

export function isAdminOrSuper(userLogged: IUser) {
  return userLogged.privilegio.toLowerCase() == "admin" ||
    userLogged.privilegio.toLowerCase() == "superadmin"
    ? true
    : false;
}

export function isSuperAdmin(userLogged: IUser) {
  return userLogged.privilegio.toLowerCase() == "superadmin" ? true : false;
}

export function isAdmin(userLogged: IUser) {
  return userLogged.privilegio.toLowerCase() == "admin" ? true : false;
}

export function isAluno(userLogged: IUser) {
  return userLogged.privilegio.toLowerCase() == "aluno" ? true : false;
}

export function isProfessor(userLogged: IUser) {
  return userLogged.privilegio.toLowerCase() == "professor" ? true : false;
}
