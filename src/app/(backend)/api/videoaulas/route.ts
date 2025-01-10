import { createVideoAulaService } from "../../services/videoaula/CreateVideoAula";
import { getAllVideoAulasService } from "../../services/videoaula/GetAllVideoAulas";

export async function GET() {
  const videoaulas = await getAllVideoAulasService.get();

  return Response.json(videoaulas);
}

export async function POST(req: Request) {
  const formData = await req.formData();

  const titulo = formData.get("titulo")?.toString();
  const descricao = formData.get("descricao")?.toString();
  const duracao = formData.get("duracao")?.toString();
  const dataAgendamento =
    formData.get("dataAgendamento") &&
    formData.get("dataAgendamento").toString();
  const moduloId = formData.get("moduloId")?.toString();
  const video = <File>formData.get("video");

  const videoaula = await createVideoAulaService.create({
    titulo: titulo || "",
    video,
    duracao: Number(duracao),
    dataAgendamento: dataAgendamento ? new Date(dataAgendamento) : new Date(),
    descricao: descricao || "",
    moduloId: moduloId || "",
  });

  return Response.json(videoaula);
}
