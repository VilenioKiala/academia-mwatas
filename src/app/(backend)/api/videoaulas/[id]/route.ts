import { deleteVideoAulaService } from "@/app/(backend)/services/videoaula/DeleteVideoAula";
import { getOneVideoAulaService } from "@/app/(backend)/services/videoaula/GetOneVideoAula";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const videoaula = await getOneVideoAulaService.get(id);

  return Response.json(videoaula);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const videoaulaDeleted = await deleteVideoAulaService.delete(id);

  console.log(videoaulaDeleted);

  return Response.json(videoaulaDeleted);
}
