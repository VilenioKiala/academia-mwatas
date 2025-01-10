import RoutingModal from "@/app/(frontend)/components/RoutingModal";
import React from "react";
import CreateConviteForm from "./CreateConviteForm";
import H1 from "@/app/(frontend)/components/H1";

export default function Page() {
  return (
    <RoutingModal className="sm:max-w-7xl p-12">
      <div className="flex-1 h-full">
        <H1>Criar Convite</H1>
        <CreateConviteForm />
      </div>
    </RoutingModal>
  );
}
