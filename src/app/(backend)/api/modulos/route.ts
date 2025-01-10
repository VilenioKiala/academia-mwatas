import { createModuleService } from "../../services/module/CreateModule";
import { getAllModulesService } from "../../services/module/GetAllModules";

export async function GET() {
  const cursos = await getAllModulesService.get();

  return Response.json(cursos);
}

export async function POST(req: Request) {
  const { titulo, cursoId } = await req.json();

  const categories = await createModuleService.create({ titulo, cursoId });

  return Response.json(categories);
}
