import { NextRequest } from "next/server";
import { ValidationError } from "../../helpers/errors/ValidationError";
import { createConviteService } from "../../services/convite/CreateConvite";
import { getAllConvitesService } from "../../services/convite/GetAllConvites";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const page = Number(searchParams.get("page")) || undefined;

  const convites = await getAllConvitesService.get(page);

  return Response.json(convites);
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
    textoDestaque: formData.get("textoDestaque")?.toString() || "",
    textoChamada: formData.get("textoChamada")?.toString() || "",
    imagem: <File>formData.get("imagem"),
  };

  try {
    const response = await createConviteService.create({
      ...data,
    });

    return Response.json(response);
  } catch (e: unknown) {
    if (e instanceof ValidationError) {
      return Response.json(e, { status: 400 });
    }

    console.log(e);

    return Response.json(e, { status: 400 });
  }
}
