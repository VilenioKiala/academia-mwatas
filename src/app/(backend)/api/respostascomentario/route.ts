import { NextRequest } from "next/server";
import { ValidationError } from "../../helpers/errors/ValidationError";
import { createRespostaComentarioService } from "../../services/respostaComentario/CreateRespostaComentario";
import { getAllRespostasComentario } from "../../services/respostaComentario/GetAllRespostasComentario";
import { getAllRespostasFromComentario } from "../../services/respostaComentario/GetAllRespostasFromComentario";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const comentarioId = searchParams.get("comentarioId");

  if (!comentarioId) {
    const respostasComentario = await getAllRespostasComentario.get();

    return Response.json(respostasComentario, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } else {
    const respostasFromComentario = await getAllRespostasFromComentario.get(
      comentarioId
    );

    return Response.json(respostasFromComentario, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
}

export async function POST(req: Request) {
  const { texto, userId, comentarioId } = (await req.json()) || {
    texto: "",
    userId: "",
    comentarioId: "",
  };

  try {
    const respostaComentario = await createRespostaComentarioService.create({
      texto: texto || "",
      userId: userId || "",
      comentarioId: comentarioId || "",
    });

    return Response.json(respostaComentario);
  } catch (e) {
    if (e instanceof ValidationError) {
      return Response.json({ error: e });
    }

    return Response.json(e);
  }
}
