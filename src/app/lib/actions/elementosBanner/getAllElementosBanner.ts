"use server";

import { getAllElementosBannerService } from "@/app/(backend)/services/elementoBanner/GetAllCourses";
import { cache } from "react";

export const getAllElementosBanner = cache(async function () {
  const elementosBanner = await getAllElementosBannerService.get();

  return elementosBanner;
});
