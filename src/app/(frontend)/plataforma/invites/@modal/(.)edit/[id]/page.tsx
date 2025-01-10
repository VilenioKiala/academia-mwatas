import RoutingModal from "@/app/(frontend)/components/RoutingModal";
import { appURL } from "@/app/lib/api/axios";
import React from "react";
import EditarMembroForm from "./EditarMembroForm";

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
