import { NextRequest } from "next/server";
import { getAllMatriculasService } from "../../services/matricula/GetAllMatriculas";
import { createMatriculaService } from "../../services/matricula/CreateMatricula";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const page = Number(searchParams.get("page")) || undefined;

  const userId = searchParams.get("userId") || undefined;

  const matriculas = await getAllMatriculasService.get(page, { userId });

  return Response.json(matriculas);
}

export async function POST(req: Request) {
  const json = await req.json();

  const { dataExpiracao, cursoId, usuarioId } = json;

  console.log("json:", json);

  // try {
  const matriculaCreated = await createMatriculaService.create({
    dataExpiracao: dataExpiracao && new Date(dataExpiracao),
    cursoId,
    userId: usuarioId,
  });

  return Response.json(matriculaCreated);
  // } catch (e) {
  //   return Response.json(e, { status: 400 });
  // }
}
