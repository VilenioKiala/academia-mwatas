import React from "react";
import { redirect, RedirectType } from "next/navigation";
import { auth } from "@/app/auth";
import { getOneUserId } from "@/app/lib/actions/user/getOneUserId";
import CredentialsIcon from "@/app/(frontend)/icons/CredentialsIcon";
import InputText from "@/app/(frontend)/components/InputText";
import EditarEmailModalButton from "./EditarSenhaModalButton";

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
    <div>
      <div className="flex gap-3 items-center">
        <CredentialsIcon width={"2em"} height={"2em"} fill="#1F68B2" />
        <h4 className="font-semibold text-myblue">Dados de Acesso</h4>
      </div>
      <div className="grid-cols-1 xl:grid-cols-2 gap-2">
        <div className="flex flex-col gap-6 p-8 border-1 border-black dark:border-white dark:bg-[#141414] rounded-lg border-opacity-20 dark:border-opacity-20 mt-6 relative">
          {/* <EditarEmailModalButton userLogged={{ ...userLogged }}>
            <p className="text-end">Alterar</p>
          </EditarEmailModalButton> */}
          <div className="flex gap-2">
            <InputText
              type="text"
              name="email"
              value={userLogged.email}
              label="Email:"
              disabled={true}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 p-8 border-1 border-black dark:border-white dark:bg-[#141414] rounded-lg border-opacity-20 dark:border-opacity-20 mt-6 relative">
          <EditarEmailModalButton userLogged={{ ...userLogged }}>
            <p className="text-end">Alterar</p>
          </EditarEmailModalButton>
          <div className="flex gap-2">
            <InputText
              type="text"
              name="senha"
              value={"************"}
              label="Senha:"
              disabled={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
