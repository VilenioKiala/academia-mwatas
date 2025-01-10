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
import PrimaryButton from "@/app/(frontend)/components/PrimaryButton";
import { Button } from "@nextui-org/button";
import DislikeIcon from "@/app/(frontend)/icons/DislikeIcon";
import DeleteButton from "@/app/(frontend)/components/DeleteButton";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";

type ComentarioAprovadoProps = {
  comentario: IComentario;
  userLogged: IUser;
};

export default function ComentarioAprovado({
  comentario,
  userLogged,
}: ComentarioAprovadoProps) {
  const router = useRouter();
  const [showInputResponder, setShowInputResponder] = React.useState(false);
  const [resposta, setResposta] = React.useState("");
  const [responderLoading, setResponderLoading] = React.useState(false);
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const { toast } = useToast();

  async function reprovarComentario() {
    await api.put(`/api/comentarios/${comentario.id}`, {
      lido: true,
      reprovado: true,
    });

    toast({
      variant: "default",
      title: "Operação bem sucedida!",
      description: "Comentario reprovado!",
      className: "bg-green-500 text-white border-1 border-green-800",
    });

    router.refresh();
    router.push("/plataforma/comunidade/aprovados");
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
    router.push("/plataforma/comunidade/aprovados");
  }

  async function handleSubmit() {
    setResponderLoading(true);

    const respostaCreated = await api.post("/api/respostascomentario", {
      texto: resposta,
      userId: userLogged.id,
      comentarioId: comentario.id,
    });

    console.log(respostaCreated);

    toast({
      variant: "default",
      title: "Operação bem sucedida!",
      description: "Resposta enviada com sucesso!",
      className: "bg-green-500 text-white border-1 border-green-800",
    });

    setResposta("");
    setResponderLoading(false);
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
            <PrimaryButton
              onClick={() => setShowInputResponder(!showInputResponder)}
            >
              Responder
            </PrimaryButton>

            <Tooltip content="Reprovar Comentário" color="foreground">
              <Button
                variant="ghost"
                className=" rounded-md box-border"
                onClick={reprovarComentario}
              >
                <DislikeIcon width={"1.8em"} height={"1.8em"} />
              </Button>
            </Tooltip>

            <Tooltip content="Eliminar Comentário" color="foreground">
              <DeleteButton onPress={onOpen} />
            </Tooltip>
          </div>

          {showInputResponder && (
            <form
              method="POST"
              onSubmit={handleSubmit}
              className="flex-1 flex flex-col gap-2 mb-12"
            >
              <div className="w-full flex gap-2">
                <textarea
                  maxLength={400}
                  name="resposta"
                  placeholder="Digite aqui a resposta do comentário"
                  value={resposta}
                  className="flex-1 border-1 p-3 mt-2 border-black border-opacity-25 rounded-xl resize-none h-28"
                  onChange={(e) => setResposta(e.target.value)}
                ></textarea>
              </div>
              <div className="w-full flex justify-end items-center gap-4">
                <p>{resposta.length}/400</p>
                <PrimaryButton
                  type="submit"
                  loading={responderLoading || resposta.length == 0}
                >
                  Adicionar Resposta
                </PrimaryButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
