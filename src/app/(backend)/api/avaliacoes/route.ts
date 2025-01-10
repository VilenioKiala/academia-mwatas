import { createAvaliacaoService } from "../../services/avaliacao/CreateAvaliacao";
import { getAllAvaliacoesService } from "../../services/avaliacao/GetAllAvaliacoes";
import { getOneAvaliacaoFromFilter } from "../../services/avaliacao/GetOneAvaliacaoFromFilter";
import { updateAvaliacaoService } from "../../services/avaliacao/UpdateAvaliacao";

export async function GET() {
  const avaliacoes = await getAllAvaliacoesService.get();

  return Response.json(avaliacoes, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(req: Request) {
  const { nota, userId, videoAulaId } = await req.json();

  let avaliacao = await getOneAvaliacaoFromFilter.get({
    userId,
    videoaulaId: videoAulaId,
  });

  if (avaliacao) {
    await updateAvaliacaoService.update({
      id: avaliacao.id,
      userId: userId,
      nota: nota,
    });

    return Response.json(avaliacao);
  }

  avaliacao = await createAvaliacaoService.create({
    nota,
    userId,
    videoAulaId: videoAulaId,
  });

  return Response.json(avaliacao);
}
