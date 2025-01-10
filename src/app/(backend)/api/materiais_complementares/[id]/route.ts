import { deleteMaterialComplementarService } from "@/app/(backend)/services/materialComplementar/DeleteMaterialComplementar";
import { getOneMaterialComplementarService } from "@/app/(backend)/services/materialComplementar/GetOneMaterialComplementar";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const materialComplementar = await getOneMaterialComplementarService.get(id);

  return Response.json(materialComplementar);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const materialComplementarDeleted =
    await deleteMaterialComplementarService.delete(id);

  console.log(materialComplementarDeleted);

  return Response.json(materialComplementarDeleted);
}
