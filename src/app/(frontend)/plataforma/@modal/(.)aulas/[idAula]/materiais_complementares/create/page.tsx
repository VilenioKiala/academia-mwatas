import RoutingModal from "@/app/(frontend)/components/RoutingModal";
import React from "react";
import CriarMaterialComplementarForm from "./CriarMaterialComplementarForm";

export default async function Page({
  params,
}: {
  params: Promise<{ idAula: string }>;
}) {
  const idAula = (await params).idAula;

  return (
    <RoutingModal>
      <CriarMaterialComplementarForm videoaulaId={idAula} />
    </RoutingModal>
  );
}
