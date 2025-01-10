import { ValidationError } from "../../helpers/errors/ValidationError";
import { createMaterialComplementarService } from "../../services/materialComplementar/CreateMaterialComplementar";
import { getAllMateriaisComplementaresService } from "../../services/materialComplementar/GetAllMateriaisComplementares";

export async function GET() {
  const materiaisComplementares =
    await getAllMateriaisComplementaresService.get();

  return Response.json(materiaisComplementares);
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
    ficheiro: <File>formData.get("ficheiro"),
    videoaulaId: formData.get("videoaulaId")?.toString() || "",
  };

  try {
    const response = await createMaterialComplementarService.create(data);

    return Response.json(response);
  } catch (e: unknown) {
    if (e instanceof ValidationError) {
      return Response.json(e, { status: 400 });
    }

    console.log(e);

    return Response.json(e, { status: 400 });
  }
}
