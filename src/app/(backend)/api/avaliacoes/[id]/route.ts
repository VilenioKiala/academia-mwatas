import { NotFoundError } from "@/app/(backend)/helpers/errors/NotFound";
import { ValidationError } from "@/app/(backend)/helpers/errors/ValidationError";
import { updateAvaliacaoService } from "@/app/(backend)/services/avaliacao/UpdateAvaliacao";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const data = {
    id,
    nota: (await req.json()).nota || undefined,
    userId: (await req.json()).userId || undefined,
    videoaulaId: (await req.json()).videoaulaId || undefined,
  };

  try {
    const response = await updateAvaliacaoService.update({
      ...data,
      nota: Number(data.nota),
    });

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
