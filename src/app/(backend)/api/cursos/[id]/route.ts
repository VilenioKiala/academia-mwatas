import { NotFoundError } from "@/app/(backend)/helpers/errors/NotFound";
import { ValidationError } from "@/app/(backend)/helpers/errors/ValidationError";
import { deleteCursoService } from "@/app/(backend)/services/course/DeleteCurso";
import { getOneCursoService } from "@/app/(backend)/services/course/GetOneCurso";
import { updateCursoService } from "@/app/(backend)/services/course/UpdateCurso";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const curso = await getOneCursoService.get(id);

  return Response.json(curso);
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
    titulo: formData.get("titulo")?.toString() || undefined,
    sobreOCurso: formData.get("sobreOCurso")?.toString() || undefined,
    fraseDestaque: formData.get("fraseDestaque")?.toString() || undefined,
    categoriaId: formData.get("categoriaId")?.toString() || undefined,
    coverCurso: <File>formData.get("coverCurso") || undefined,
    preco: Number(formData.get("preco")?.toString() || undefined),
  };

  try {
    const response = await updateCursoService.update(data, id);

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

  const cursoDeleted = await deleteCursoService.delete(id);

  console.log(cursoDeleted);

  return Response.json(cursoDeleted);
}
