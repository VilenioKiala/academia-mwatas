import { NextRequest } from "next/server";
import { createVisualizacaoService } from "../../services/visualizacao/CreateVisualizacao";
import { getAllVisualizacoesService } from "../../services/visualizacao/GetAllVisualizacoes";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const userId = searchParams.get("userId") || undefined;
  const videoaulaId = searchParams.get("videoaulaId") || undefined;

  const visualizacoes = await getAllVisualizacoesService.get({
    userId,
    videoaulaId,
  });

  return Response.json(visualizacoes, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(req: Request) {
  const { videoaulaId, userId } = await req.json();

  console.log("videoaulaId e userId", videoaulaId, userId);

  const visualizacao = await createVisualizacaoService.create({
    videoaulaId,
    userId,
  });

  return Response.json(visualizacao);
}
