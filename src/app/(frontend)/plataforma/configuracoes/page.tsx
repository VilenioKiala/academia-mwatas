import React from "react";
import CredentialsIcon from "../../icons/CredentialsIcon";
import Link from "next/link";
import EmailIcon from "../../icons/EmailIcon";
import PasswordIcon from "../../icons/PasswordIcon";
import UserIcon from "../../icons/UserIcon";
import LayoutIcon from "../../icons/LayoutIcon";
import Separator from "../../components/Separator";
import { Button } from "@nextui-org/button";
import { redirect, RedirectType } from "next/navigation";
import { getOneUserId } from "@/app/lib/actions/user/getOneUserId";
import { auth } from "@/app/auth";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin", RedirectType.replace);
  }

  const userLogged = await getOneUserId(session?.user?.id);

  if (!userLogged) {
    redirect("/signin", RedirectType.replace);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col border-1 gap-4 border-black border-opacity-20 p-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <CredentialsIcon
              width={"2em"}
              height={"2em"}
              className="fill-myblue"
            />
            <h4 className="font-semibold text-myblue">Dados de Acesso</h4>
          </div>
          <Link href={"/plataforma/configuracoes/dados_acesso"}>Alterar</Link>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center opacity-70">
            <EmailIcon width="1.5em" height="1.5em" />
            <p>{userLogged.email}</p>
          </div>
          <div className="flex gap-2 items-center opacity-70">
            <PasswordIcon width="1.5em" height="1.5em" />
            <p>Senha: *************</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col border-1 gap-4 border-black border-opacity-20 p-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <UserIcon width={"2em"} height={"2em"} fill="#1F68B2" />
            <h4 className="font-semibold text-myblue">Dados Pessoais</h4>
          </div>
          <Link href={"/plataforma/configuracoes/dados_pessoais"}>Alterar</Link>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center opacity-70">
            <p>
              <span className="capitalize">
                {userLogged.nome} {userLogged.sobrenome}
              </span>{" "}
              - @{userLogged.nomeUsuario}
            </p>
          </div>

          {userLogged.genero && (
            <div className="flex items-center opacity-70">
              <p>
                Genero:{" "}
                <span className="capitalize font-medium">
                  {userLogged.genero}
                </span>{" "}
              </p>
            </div>
          )}

          {userLogged.dataNascimento && (
            <div className="flex items-center opacity-70">
              <p>
                Data de nascimento:{" "}
                <span className="capitalize font-medium">
                  {userLogged.dataNascimento.toLocaleDateString()} (
                  {new Date().getFullYear() -
                    userLogged.dataNascimento.getFullYear()}
                  {" anos"})
                </span>{" "}
              </p>
            </div>
          )}

          {userLogged.numeroTelefone && (
            <div className="flex items-center opacity-70">
              <p>
                Número de Telefone:{" "}
                <span className="capitalize font-medium">
                  +244 {userLogged.numeroTelefone}
                </span>{" "}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col border-1 gap-4 border-black border-opacity-20 p-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <LayoutIcon width={"2em"} height={"2em"} fill="#1F68B2" />
            <h4 className="font-semibold text-myblue">Layout</h4>
          </div>
          <Link href={"/plataforma/configuracoes/layout"}>Alterar</Link>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center opacity-70">
            <p>Modo Claro</p>
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-2">
        <p className="font-semibold">Excluir minha conta</p>
        <p>
          Se você excluir sua conta, todos os dados relacionados a você serão
          deletados e não será possível a restauração.
        </p>
        <Button variant="flat" color="danger" className="w-fit mt-2">
          Eliminar minha conta
        </Button>
      </div>
    </div>
  );
}
