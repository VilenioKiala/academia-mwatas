import RoutingModal from "@/app/(frontend)/components/RoutingModal";
import React from "react";
import AdicionarElementoBannerForm from "./AdicionarElementoBannerForm";
import { appURL } from "@/app/lib/api/axios";

export default async function Page() {
  const cursos = await (await fetch(`${appURL}/api/cursos`)).json();

  return (
    <RoutingModal>
      <AdicionarElementoBannerForm cursos={cursos} />
    </RoutingModal>
  );
}
