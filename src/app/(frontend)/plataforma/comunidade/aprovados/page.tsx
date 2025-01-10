import { getComentariosAprovados } from "@/app/lib/actions/comentario/getComentariosAprovados";
import React from "react";
import ComentarioAprovado from "./ComentarioAprovado";
import { redirect, RedirectType } from "next/navigation";
import { auth } from "@/app/auth";
import { getOneUserId } from "@/app/lib/actions/user/getOneUserId";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin", RedirectType.replace);
  }

  const userLogged = await getOneUserId(session?.user?.id);

  if (!userLogged) {
    redirect("/signin", RedirectType.replace);
  }

  const comentariosAprovados = await getComentariosAprovados();

  return (
    <div>
      <div className="flex flex-col gap-8 mt-8">
        {comentariosAprovados.length == 0 && (
          <p className="text-center font-semibold">
            Não há nenhum comentário aprovado no momento!
          </p>
        )}
        {comentariosAprovados.map((comentario) => {
          return (
            <div key={comentario.id}>
              <ComentarioAprovado
                comentario={{ ...comentario }}
                userLogged={{ ...userLogged }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
