// import { getOneCourseService } from "@/app/(backend)/services/course/GetOneCourse";

import { deleteModuleService } from "@/app/(backend)/services/module/DeleteModule";

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

  const moduloDeleted = await deleteModuleService.delete(id);

  console.log(moduloDeleted);

  return Response.json(moduloDeleted);
}
