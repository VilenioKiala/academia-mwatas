import { createElementoBannerService } from "../../services/elementoBanner/CreateElementoBanner";
import { getAllElementosBannerService } from "../../services/elementoBanner/GetAllCourses";

export async function GET() {
  const elementosBanner = await getAllElementosBannerService.get();

  return Response.json(elementosBanner);
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
    cursoId: formData.get("cursoId")?.toString() || "",
    link: formData.get("link")?.toString() || "",
    photo: <File>formData.get("photo"),
  };

  // try {
  const response = await createElementoBannerService.create(data);

  return Response.json(response);
  // } catch (e: unknown) {
  //   if (e instanceof ValidationError) {
  //     return Response.json(e, { status: 400 });
  //   }

  //   return Response.json(e, { status: 400 });
  // }
}
