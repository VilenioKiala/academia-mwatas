import { NextRequest } from "next/server";
import { ValidationError } from "../../helpers/errors/ValidationError";
import { createCursoService } from "../../services/course/CreateCurso";
import { getAllCursosService } from "../../services/course/GetAllCursos";
import { getCursosWithPaginationAndFilterService } from "../../services/course/GetCursosWithPaginationAndFilter";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const page = Number(searchParams.get("page")) || undefined;
  const cursosPerPage = Number(searchParams.get("cursosPerPage")) || undefined;

  const filter = {
    categoriaId: searchParams.get("categoriaId") || undefined,
    disponibilidade: searchParams.get("disponibilidade") || undefined,
    query: searchParams.get("query") || undefined,
  };

  const take = searchParams.get("take") || undefined;

  let cursos;

  if (page) {
    cursos = await getCursosWithPaginationAndFilterService.get({
      cursosPerPage,
      page,
      filter,
      take: Number(take),
    });
  } else {
    cursos = await getAllCursosService.get();
  }

  return Response.json(cursos);
}

export async function POST(req: Request) {
  let formData;
  try {
    formData = await req.formData();
  } catch (e) {
    console.log(e);
    return Response.json(e, { status: 400 });
  }

  const data = {
    titulo: formData.get("titulo")?.toString() || "",
    sobreOCurso: formData.get("sobreOCurso")?.toString() || "",
    fraseDestaque: formData.get("fraseDestaque")?.toString() || "",
    categoriaId: formData.get("categoriaId")?.toString() || "",
    coverCurso: <File>formData.get("coverCurso"),
    preco: Number(formData.get("preco")?.toString() || ""),
  };

  try {
    const response = await createCursoService.create(data);

    return Response.json(response);
  } catch (e: unknown) {
    if (e instanceof ValidationError) {
      return Response.json(e, { status: 400 });
    }

    console.log(e);

    return Response.json(e, { status: 400 });
  }
}
