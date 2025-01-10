import { deleteVisualizacaoService } from "@/app/(backend)/services/visualizacao/DeleteVisualizacao";
import { getOneVisualizacaoService } from "@/app/(backend)/services/visualizacao/GetOneVisualizacao";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const visualizacao = await getOneVisualizacaoService.get(id);

  return Response.json(visualizacao);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const visualizacaoDeleted = await deleteVisualizacaoService.delete(id);

  console.log(visualizacaoDeleted);

  return Response.json(visualizacaoDeleted);
}
