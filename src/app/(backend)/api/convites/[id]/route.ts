import { deleteCertificadoService } from "@/app/(backend)/services/certificado/DeleteCertificado";
import { getOneConviteService } from "@/app/(backend)/services/convite/GetOneConvite";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const convite = await getOneConviteService.get(id);

  return Response.json(convite);
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
