import { NextRequest } from "next/server";
import { createUserService } from "../../services/user/CreateUser";
import { getAllUsersService } from "../../services/user/GetAllUsers";
import { isNotEmpty } from "class-validator";
import { getUsersWithPaginationAndFilterService } from "../../services/user/GetUsersWithPaginationAndFilter";
import { UserFilterParams } from "../../interfaces/repositories/IUserRepository";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const page = Number(searchParams.get("page")) || undefined;
  const usersPerPage = Number(searchParams.get("usersPerPage")) || undefined;
  const assinantes = searchParams.get("assinantes") || undefined;

  const filter: UserFilterParams = {
    privilegio: searchParams.get("privilegio") || undefined,
    assinantes: assinantes && assinantes == "true" ? true : false,
    query: searchParams.get("query") || undefined,
    cursoIdMatriculado: searchParams.get("cursoIdMatriculado") || undefined,
  };

  let users;

  if (page) {
    users = await getUsersWithPaginationAndFilterService.get({
      usersPerPage,
      page,
      filter,
    });
  } else {
    users = await getAllUsersService.get();
  }

  return Response.json(users);
}

export async function POST(req: Request) {
  const formData = await req.formData();

  const nome = formData.get("nome").toString() || "";
  const sobrenome = formData.get("sobrenome").toString() || "";
  const nomeUsuario = formData.get("nome_usuario").toString() || "";
  const senha = formData.get("senha").toString() || "";
  const repetirSenha = formData.get("repetir_senha").toString() || "";
  const privilegio = formData.get("privilegio").toString() || "";
  let profilePic;

  if (isNotEmpty(formData.get("profilePic"))) {
    profilePic = <File>formData.get("profilePic");
  }

  // try {
  const userCreated = await createUserService.create({
    nome,
    sobrenome,
    nomeUsuario,
    senha,
    repetirSenha,
    privilegio,
    profilePic,
  });

  return Response.json(userCreated);
  // } catch (e) {
  //   return Response.json(e, { status: 400 });
  // }
}
