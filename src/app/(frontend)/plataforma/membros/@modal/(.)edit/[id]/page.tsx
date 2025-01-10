import RoutingModal from "@/app/(frontend)/components/RoutingModal";
import React from "react";
import EditarMembroForm from "./EditarMembroForm";
import { appURL } from "@/app/lib/api/axios";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const user = await (await fetch(`${appURL}/api/users/${id}`)).json();

  return (
    <RoutingModal>
      <EditarMembroForm user={user}></EditarMembroForm>
    </RoutingModal>
  );
}
