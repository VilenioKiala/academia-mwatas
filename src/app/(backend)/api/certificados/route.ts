import { ValidationError } from "../../helpers/errors/ValidationError";
import { createCertificadoService } from "../../services/certificado/CreateCertificado";
import { getAllCertificadosService } from "../../services/certificado/GetAllCertificados";

export async function GET() {
  const certificados = await getAllCertificadosService.get();

  return Response.json(certificados);
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
    texto: formData.get("titulo")?.toString() || "",
    cursoId: formData.get("cursoId")?.toString() || "",
    userId: formData.get("usuarioId")?.toString() || "",
    imagem: <File>formData.get("imagem"),
  };

  try {
    const response = await createCertificadoService.create({
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
