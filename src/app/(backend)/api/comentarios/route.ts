import { NextRequest } from "next/server";
import { ValidationError } from "../../helpers/errors/ValidationError";
import { createComentarioService } from "../../services/comentario/CreateComentario";
import { getAllComentariosService } from "../../services/comentario/GetAllComentarios";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId") || undefined;
  const lido = searchParams.get("lido") || undefined;
  const reprovado = searchParams.get("reprovado") || undefined;

  const comentarios = await getAllComentariosService.get({
    userId,
    lido: lido && lido == "true" ? true : false,
    reprovado: reprovado && reprovado == "true" ? true : false,
  });

  return Response.json(comentarios, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(req: Request) {
  const { texto, userId, videoAulaId } = (await req.json()) || {
    texto: "",
    userId: "",
    videoAulaId: "",
  };

  try {
    const comentario = await createComentarioService.create({
      texto: texto || "",
      userId: userId || "",
      videoAulaId: videoAulaId || "",
    });

    return Response.json(comentario);
  } catch (e) {
    if (e instanceof ValidationError) {
      return Response.json({ error: e });
    }

    return Response.json(e);
  }
}
