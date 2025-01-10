import { deleteMatriculaService } from "@/app/(backend)/services/matricula/DeleteMatricula";
import { getOneUserService } from "@/app/(backend)/services/user/GetOneUser";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const user = await getOneUserService.get(id);

  return Response.json(user);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const matriculaDeleted = await deleteMatriculaService.delete(id);

  console.log(matriculaDeleted);

  return Response.json(matriculaDeleted);
}
