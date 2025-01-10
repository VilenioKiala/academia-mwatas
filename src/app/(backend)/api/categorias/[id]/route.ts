import { deleteCategoriaService } from "@/app/(backend)/services/categoria/DeleteCategoria";
import { getOneCategoriaService } from "@/app/(backend)/services/categoria/GetOneCategoria";
import { updateCategoriaService } from "@/app/(backend)/services/categoria/UpdateCategoria";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const category = await getOneCategoriaService.get(id);

  return Response.json(category);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const data = {
    titulo: (await req.json()).titulo || undefined,
  };

  // try {
  const response = await updateCategoriaService.update(data, id);

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

  const categoriaDeleted = await deleteCategoriaService.delete(id);

  console.log(categoriaDeleted);

  return Response.json(categoriaDeleted);
}
