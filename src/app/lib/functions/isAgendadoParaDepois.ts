import { IVideoAula } from "@/app/(backend)/interfaces/objects/IVideoAula";
import { parseAbsoluteToLocal } from "@internationalized/date";

export function isVideoAulaAgendadaParaDepois(videoAula: IVideoAula) {
  return parseAbsoluteToLocal(
    new Date(videoAula.dataAgendamento).toISOString()
  ).compare(parseAbsoluteToLocal(new Date().toISOString())) > 0
    ? true
    : false;
}
