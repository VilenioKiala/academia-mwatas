import RoutingModal from "@/app/(frontend)/components/RoutingModal";
import React from "react";
import CreateMembroForm from "./CreateMembroForm";

export default function Page() {
  return (
    <RoutingModal>
      <div>
        <CreateMembroForm />
      </div>
    </RoutingModal>
  );
}
