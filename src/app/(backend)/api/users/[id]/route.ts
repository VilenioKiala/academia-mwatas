// import { NotFoundError } from "@/app/(backend)/helpers/errors/NotFound";
// import { ValidationError } from "@/app/(backend)/helpers/errors/ValidationError";
import { deleteUserService } from "@/app/(backend)/services/user/DeleteUser";
import { getOneUserService } from "@/app/(backend)/services/user/GetOneUser";
import { updateUserService } from "@/app/(backend)/services/user/UpdateUser";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const user = await getOneUserService.get(id);

  return Response.json(user);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  let formData;
  try {
    formData = await req.formData();
  } catch (e) {
    console.log(e);
    return Response.json(e, { status: 400 });
  }

  const data = {
    nome: formData.get("nome")?.toString() || undefined,
    sobrenome: formData.get("sobrenome")?.toString() || undefined,
    nomeUsuario: formData.get("nomeUsuario")?.toString() || undefined,
    email: formData.get("email") || undefined,
    senha: formData.get("senha")?.toString() || undefined,
    repetirSenha: formData.get("repetirSenha")?.toString() || undefined,
    emailConfirmado: formData.get("emailConfirmado")?.toString() || undefined,
    dataNascimento: formData.get("dataNascimento")?.toString() || undefined,
    sobre: formData.get("sobre") || undefined,
    numeroTelefone: formData.get("numeroTelefone")?.toString() || undefined,
    genero: formData.get("genero") || undefined,
    bloqueado: formData.get("bloqueado")?.toString() || undefined,
    profilePic:
      <File>formData.get("profilePic") == undefined
        ? undefined
        : <File>formData.get("profilePic"),
    privilegio: formData.get("privilegio")?.toString() || undefined,
  };

  // try {
  const response = await updateUserService.update({
    ...data,
    id,
    dataNascimento: data.dataNascimento && new Date(data.dataNascimento),
    bloqueado: data.bloqueado && data.bloqueado == "true" ? true : false,
  });

  return Response.json(response);
  // } catch (e: unknown) {
  //   if (e instanceof ValidationError) {
  //     return Response.json(e, { status: 400 });
  //   }

  //   if (e instanceof NotFoundError) {
  //     return Response.json(e, { status: 404 });
  //   }

  //   console.log(e);

  //   return Response.json(e, { status: 400 });
  // }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const userDeleted = await deleteUserService.delete(id);

  console.log(userDeleted);

  return Response.json(userDeleted);
}
