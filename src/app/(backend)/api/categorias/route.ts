import { createCategoriaService } from "../../services/categoria/CreateCategoria";
import { getAllCategoriasService } from "../../services/categoria/GetAllCategorias";

export async function GET() {
  const categories = await getAllCategoriasService.get();

  return Response.json(categories, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(req: Request) {
  const { titulo } = await req.json();

  const categories = await createCategoriaService.create({ titulo });

  return Response.json(categories);
}
