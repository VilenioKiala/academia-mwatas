"use server";

import { materialComplementarRepository } from "@/app/(backend)/repositories/MysqlSequelizeRepository/MaterialComplementarRepository";

export async function getFiveMateriaisComplementares() {
  const materiaisComplementares =
    await materialComplementarRepository.getFive();

  return materiaisComplementares;
}
