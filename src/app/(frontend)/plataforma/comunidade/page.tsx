import { getComentariosNaoLidos } from "@/app/lib/actions/comentario/getComentariosNaoLidos";
import React from "react";
import ComentarioComunidade from "./ComentarioComunidade";
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

  const comentariosNaoLidos = await getComentariosNaoLidos();

  const comentariosNaoLidoSemUserLogged = comentariosNaoLidos.filter(
    (comentario) => comentario.userId !== userLogged.id
  );

  return (
    <div>
      <div className="flex flex-col gap-8 mt-8">
        {comentariosNaoLidoSemUserLogged.length == 0 && (
          <p className="text-center font-semibold">
            Não há nenhum comentário não lido no momento!
          </p>
        )}
        {comentariosNaoLidoSemUserLogged.map((comentario) => {
          return (
            <div key={comentario.id} className="w-full">
              <ComentarioComunidade
                userLogged={{ ...userLogged }}
                comentario={{ ...comentario }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
