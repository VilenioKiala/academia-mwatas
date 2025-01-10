"use client";

import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { isAdminOrSuper } from "@/app/lib/functions/isAdminOrSuper";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React from "react";

type LinkListProps = {
  userLogged: IUser;
};

export default function LinkList({ userLogged }: LinkListProps) {
  const pathname = usePathname();

  return (
    <Listbox
      aria-label="User Menu"
      className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 overflow-visible shadow-small rounded-medium w-full border-1 border-black border-opacity-20 text-foreground"
      itemClasses={{
        base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
      }}
      onAction={(key) => redirect(key as string)}
    >
      <ListboxItem
        key="/plataforma/configuracoes"
        className={`py-8 ${
          pathname == "/plataforma/configuracoes" &&
          "bg-myblue text-white font-semibold"
        }`}
      >
        <Link href={"/plataforma/configuracoes"}>Visão Geral</Link>
      </ListboxItem>

      {!isAdminOrSuper(userLogged) && (
        <ListboxItem
          key="/plataforma/configuracoes/matriculas"
          className={`py-8 ${
            pathname == "/plataforma/configuracoes/matriculas" &&
            "bg-myblue text-white font-semibold"
          }`}
        >
          Matriculas
        </ListboxItem>
      )}

      <ListboxItem
        key="/plataforma/configuracoes/dados_acesso"
        className={`py-8 ${
          pathname == "/plataforma/configuracoes/dados_acesso" &&
          "bg-myblue text-white font-semibold"
        }`}
      >
        Dados de Acesso
      </ListboxItem>

      <ListboxItem
        key="/plataforma/configuracoes/dados_pessoais"
        className={`py-8 ${
          pathname == "/plataforma/configuracoes/dados_pessoais" &&
          "bg-myblue text-white font-semibold"
        }`}
      >
        Dados Pessoais
      </ListboxItem>
      <ListboxItem
        key="/plataforma/configuracoes/layout"
        className={`py-8 ${
          pathname == "/plataforma/configuracoes/layout" &&
          "bg-myblue text-white font-semibold"
        }`}
      >
        Layout
      </ListboxItem>
    </Listbox>
  );
}
