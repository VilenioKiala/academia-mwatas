"use client";

import { IComentario } from "@/app/(backend)/interfaces/objects/IComentario";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { IVideoAula } from "@/app/(backend)/interfaces/objects/IVideoAula";
import Avatar from "@/app/(frontend)/components/Avatar";
import Comentario from "@/app/(frontend)/components/Comentario";
import H3 from "@/app/(frontend)/components/H3";
import PrimaryButton from "@/app/(frontend)/components/PrimaryButton";
import Separator from "@/app/(frontend)/components/Separator";
import { createComentario } from "@/app/lib/actions/comentario/createComentario";
import { useToast } from "@/hooks/use-toast";
import React, { SyntheticEvent, useState } from "react";

type ComentariosProps = {
  videoAula: IVideoAula;
  userLogged: IUser;
};

export default function Comentarios({
  userLogged,
  videoAula,
}: ComentariosProps) {
  const [comentario, setComentario] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    await createComentario(comentario, userLogged.id, videoAula.id);

    setComentario("");

    toast({
      variant: "default",
      title: "Operação bem sucedida!",
      description: "Comentário criado com sucesso!",
      className: "bg-green-500 text-white border-1 border-green-800",
    });

    setLoading(false);
  }

  return (
    <div className="px-4 lg:px-0">
      <H3>Comentários </H3>
      <Separator className="my-4" />
      <div className="flex gap-8 w-full">
        <Avatar />
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-2 mb-12"
        >
          <div className="w-full flex gap-2">
            <textarea
              maxLength={400}
              name="comentar"
              placeholder="Digite o seu comentário"
              value={comentario}
              className="flex-1 border-1 p-3 outline-none focus:border-myblue text-foreground dark:bg-gray-900 border-black border-opacity-25 rounded-xl resize-none h-28"
              onChange={(e) => setComentario(e.target.value)}
            ></textarea>
          </div>
          <div className="w-full flex justify-end items-center gap-4">
            <p>{comentario.length}/400</p>
            <PrimaryButton
              type="submit"
              loading={loading || comentario.length == 0}
            >
              Adicionar Comentário
            </PrimaryButton>
          </div>
        </form>
      </div>

      {videoAula.comentarios.map((comentario: IComentario) => {
        return (
          <div key={comentario.id} className="my-8">
            <Comentario
              userLogged={{ ...userLogged }}
              texto={comentario.texto}
              fotoUsuario={comentario.usuario.profilePic}
              nomeUsuario={comentario.usuario.nomeUsuario}
              nome={`${comentario.usuario.nome}`}
              reprovado={comentario.reprovado}
              sobrenome={
                comentario.usuario.id == userLogged.id
                  ? `${comentario.usuario.sobrenome} (Eu)`
                  : `${comentario.usuario.sobrenome}`
              }
              data={new Date(comentario.createdAt)}
              comentarioId={comentario.id}
            />
          </div>
        );
      })}
    </div>
  );
}
