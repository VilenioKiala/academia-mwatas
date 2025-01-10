// import { getOneCourseService } from "@/app/(backend)/services/course/GetOneCourse";

import { deleteElementoBanner } from "@/app/(backend)/services/elementoBanner/DeleteElementoBanner";

// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const id = (await params).id;

//   const curso = await getOneCourseService.get(id);

//   return Response.json(curso);
// }

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const elementoBannerDeleted = await deleteElementoBanner.delete(id);

  console.log(elementoBannerDeleted);

  return Response.json(elementoBannerDeleted);
}
