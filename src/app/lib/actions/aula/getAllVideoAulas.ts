import { getAllVideoAulasService } from "@/app/(backend)/services/videoaula/GetAllVideoAulas";
import { cache } from "react";

export const getAllVideoAulas = cache(async function () {
  const videoaulas = await getAllVideoAulasService.get(4);

  return videoaulas;
});
