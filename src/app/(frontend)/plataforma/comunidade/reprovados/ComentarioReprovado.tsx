"use client";

import { IComentario } from "@/app/(backend)/interfaces/objects/IComentario";
import React from "react";
import Link from "next/link";
import { Tooltip } from "@nextui-org/tooltip";
import { useDisclosure } from "@nextui-org/modal";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/app/lib/api/axios";
import { useRouter } from "next/navigation";
import DangerConfirmationDialog from "@/app/(frontend)/components/DangerConfirmationDialog";
import Avatar from "@/app/(frontend)/components/Avatar";
import { Button } from "@nextui-org/button";
import DeleteButton from "@/app/(frontend)/components/DeleteButton";
import LikeIcon from "@/app/(frontend)/icons/LikeIcon";

type ComentarioReprovadoProps = {
  comentario: IComentario;
};

export default function ComentarioReprovado({
  comentario,
}: ComentarioReprovadoProps) {
  const router = useRouter();
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const { toast } = useToast();

  async function aprovarComentario() {
    await api.put(`/api/comentarios/${comentario.id}`, {
      lido: true,
      reprovado: false,
    });

    toast({
      variant: "default",
      title: "Operação bem sucedida!",
      description: "Comentario aprovado com sucesso!",
      className: "bg-green-500 text-white border-1 border-green-800",
    });

    router.refresh();
    router.push("/plataforma/comunidade/reprovados");
  }

  async function DeleteComentario() {
    await api.delete(`/api/comentarios/${comentario.id}`);

    toast({
      variant: "default",
      title: "Operação bem sucedida!",
      description: "Comentario deletado com sucesso!",
      className: "bg-green-500 text-white border-1 border-green-800",
    });

    router.refresh();
    router.push("/plataforma/comunidade/reprovados");
  }

  return (
    <>
      <DangerConfirmationDialog
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        confirmationAction={DeleteComentario}
        titulo="Aviso!"
        descricao={`Tem certeza que quer apagar o Comentario "${comentario.texto}"`}
        // eslint-disable-next-line react/no-children-prop
        children={undefined}
      />
      <div className="flex gap-4 border-1 border-black border-opacity-20 p-6 rounded-md">
        <div>
          <Avatar foto={comentario.usuario.profilePic} />
        </div>
        <div className="flex flex-col gap-1">
          <p>
            <span className="font-semibold">
              @{comentario.usuario.nomeUsuario.toLowerCase()}
            </span>{" "}
            Comentou na aula{" "}
            <Link
              className="font-semibold"
              href={`/plataforma/conteudos/aula/${comentario.videoAula.id}`}
            >
              {comentario.videoAula.titulo}
            </Link>
          </p>
          <p>{comentario.texto}</p>
          <div className="flex items-center mt-2 gap-2">
            <Tooltip content="Aprovar Comentário" color="foreground">
              <Button
                variant="ghost"
                className=" rounded-md box-border"
                onClick={aprovarComentario}
              >
                <LikeIcon width={"1.8em"} height={"1.8em"} />
              </Button>
            </Tooltip>

            <Tooltip content="Eliminar Comentário" color="foreground">
              <DeleteButton onPress={onOpen} />
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}
