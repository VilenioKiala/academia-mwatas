import { NotFoundError } from "@/app/(backend)/helpers/errors/NotFound";
import { ValidationError } from "@/app/(backend)/helpers/errors/ValidationError";
import { deleteComentarioService } from "@/app/(backend)/services/comentario/DeleteComentario";
import { updateComentarioService } from "@/app/(backend)/services/comentario/UpdateComentario";

// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const id = (await params).id;

//   const curso = await getOneCourseService.get(id);

//   return Response.json(curso);
// }

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const { texto, userId, videoAulaId, lido, reprovado } =
    (await req.json()) || {
      texto: undefined,
      userId: undefined,
      videoAulaId: undefined,
      lido: undefined,
      reprovado: undefined,
    };

  try {
    const response = await updateComentarioService.update(
      {
        texto,
        userId,
        lido,
        reprovado,
        videoaulaId: videoAulaId,
      },
      id
    );

    return Response.json(response);
  } catch (e: unknown) {
    if (e instanceof ValidationError) {
      return Response.json(e, { status: 400 });
    }

    if (e instanceof NotFoundError) {
      return Response.json(e, { status: 404 });
    }

    console.log(e);

    return Response.json(e, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const comentarioDeleted = await deleteComentarioService.delete(id);

  console.log(comentarioDeleted);

  return Response.json(comentarioDeleted);
}
