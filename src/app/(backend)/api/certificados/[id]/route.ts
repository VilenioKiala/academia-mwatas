import { deleteCertificadoService } from "@/app/(backend)/services/certificado/DeleteCertificado";
import { getOneCertificadoService } from "@/app/(backend)/services/certificado/GetOneCertificado";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const certificado = await getOneCertificadoService.get(id);

  return Response.json(certificado);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const certificadoDeleted = await deleteCertificadoService.delete(id);

  console.log(certificadoDeleted);

  return Response.json(certificadoDeleted);
}
