import RoutingModal from "@/app/(frontend)/components/RoutingModal";
import React from "react";
import CreateCategoriaForm from "./CreateCategoriaForm";

export default function Page() {
  return (
    <RoutingModal>
      <CreateCategoriaForm />
    </RoutingModal>
  );
}
