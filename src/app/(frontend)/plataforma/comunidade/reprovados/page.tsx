import { getComentariosAprovados } from "@/app/lib/actions/comentario/getComentariosAprovados";
import React from "react";
import { redirect, RedirectType } from "next/navigation";
import { auth } from "@/app/auth";
import { getOneUserId } from "@/app/lib/actions/user/getOneUserId";
import { getComentariosReprovados } from "@/app/lib/actions/comentario/getComentariosReprovados";
import ComentarioReprovado from "./ComentarioReprovado";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin", RedirectType.replace);
  }

  const userLogged = await getOneUserId(session?.user?.id);

  if (!userLogged) {
    redirect("/signin", RedirectType.replace);
  }

  const comentariosReprovados = await getComentariosReprovados();

  return (
    <div>
      <div className="flex flex-col gap-8 mt-8">
        {comentariosReprovados.length == 0 && (
          <p className="text-center font-semibold">
            Não há nenhum comentário aprovado no momento!
          </p>
        )}
        {comentariosReprovados.map((comentario) => {
          return (
            <div key={comentario.id}>
              <ComentarioReprovado
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
