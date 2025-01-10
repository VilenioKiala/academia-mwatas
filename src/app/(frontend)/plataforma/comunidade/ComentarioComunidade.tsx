"use client";

import React from "react";
import { IComentario } from "@/app/(backend)/interfaces/objects/IComentario";
import Avatar from "../../components/Avatar";
import PrimaryButton from "../../components/PrimaryButton";
import Link from "next/link";
import DislikeIcon from "../../icons/DislikeIcon";
import { Button } from "@nextui-org/button";
import DeleteButton from "../../components/DeleteButton";
import EyeIcon from "../../icons/EyeIcon";
import { Tooltip } from "@nextui-org/tooltip";
import DangerConfirmationDialog from "../../components/DangerConfirmationDialog";
import { useDisclosure } from "@nextui-org/modal";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/app/lib/api/axios";
import { useRouter } from "next/navigation";
import LikeIcon from "../../icons/LikeIcon";
import { useFormik } from "formik";
import * as yup from "yup";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { createRespostaComentario } from "@/app/lib/actions/respostaComentario/createRespostaComentario";

type ComentarioComunidadeProps = {
  comentario: IComentario;
  userLogged: IUser;
};

export default function ComentarioComunidade({
  comentario,
  userLogged,
}: ComentarioComunidadeProps) {
  const router = useRouter();
  const [showInputResponder, setShowInputResponder] = React.useState(false);
  const [responderLoading, setResponderLoading] = React.useState(false);
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      resposta: "",
    },
    validationSchema: yup.object().shape({
      resposta: yup.string().required(),
    }),

    onSubmit: async (values, { setValues, setErrors }) => {
      console.log("submitou");
      setResponderLoading(true);

      await createRespostaComentario(
        values.resposta,
        userLogged.id,
        comentario.id
      );

      await api.put(`/api/comentarios/${comentario.id}`, {
        lido: true,
      });

      toast({
        variant: "default",
        title: "Operação bem sucedida!",
        description: "Resposta enviada com sucesso!",
        className: "bg-green-500 text-white border-1 border-green-800",
      });

      setValues({ resposta: "" });
      setErrors({ resposta: "" });
      setResponderLoading(false);
    },
  });

  const { toast } = useToast();

  const { handleSubmit, values, handleChange } = formik;

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
    router.push("/plataforma/comunidade");
  }

  async function aprovarComentario() {
    await api.put(`/api/comentarios/${comentario.id}`, {
      lido: true,
    });

    toast({
      variant: "default",
      title: "Operação bem sucedida!",
      description: "Comentario aprovado com sucesso!",
      className: "bg-green-500 text-white border-1 border-green-800",
    });

    router.refresh();
    router.push("/plataforma/comunidade");
  }

  async function marcarComentarioComoLido() {
    await api.put(`/api/comentarios/${comentario.id}`, {
      lido: true,
    });

    toast({
      variant: "default",
      title: "Operação bem sucedida!",
      description: "Comentario marcado como lido!",
      className: "bg-green-500 text-white border-1 border-green-800",
    });

    router.refresh();
    router.push("/plataforma/comunidade");
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
    router.push("/plataforma/comunidade");
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
      <div className="flex gap-4 border-1 border-black border-opacity-20 p-6 rounded-md w-full">
        <div>
          <Avatar foto={comentario.usuario.profilePic} />
        </div>
        <div className="flex flex-col gap-1 w-full">
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
          <div className="flex items-center mt-2 gap-2 w-full">
            <PrimaryButton
              onClick={() => setShowInputResponder(!showInputResponder)}
            >
              Responder
            </PrimaryButton>
            <Tooltip content="Marcar como Lida" color="foreground">
              <Button
                variant="ghost"
                className="rounded-md box-border p-0 w-fit"
                onPress={marcarComentarioComoLido}
              >
                <EyeIcon width={"1.8em"} height={"1.8em"} />
              </Button>
            </Tooltip>

            <Tooltip content="Aprovar Comentário" color="foreground">
              <Button
                variant="ghost"
                className=" rounded-md box-border"
                onPress={aprovarComentario}
              >
                <LikeIcon width={"1.8em"} height={"1.8em"} />
              </Button>
            </Tooltip>

            <Tooltip content="Reprovar Comentário" color="foreground">
              <Button
                variant="ghost"
                className="rounded-md box-border"
                onPress={reprovarComentario}
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
              className="flex-1 flex flex-col gap-2 mb-12 w-full relative"
            >
              <div className="w-full flex gap-2">
                <textarea
                  maxLength={400}
                  name="resposta"
                  placeholder="Digite aqui a resposta do comentário"
                  className="flex-1 border-1 p-3 mt-2 outline-none focus:border-myblue border-black border-opacity-25 rounded-xl resize-none h-28 text-foreground w-full"
                  value={values.resposta}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full flex justify-end items-center gap-4">
                <p>{values.resposta.length}/400</p>
                <PrimaryButton
                  type="submit"
                  loading={responderLoading || values.resposta.length == 0}
                >
                  Enviar Resposta
                </PrimaryButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
