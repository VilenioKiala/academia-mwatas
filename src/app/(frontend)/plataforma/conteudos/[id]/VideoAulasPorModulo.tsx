"use client";

import React from "react";
import AdicionarVideoAulaModalButton from "./AdicionarVideoAulaModalButton";
import H3 from "@/app/(frontend)/components/H3";
import VideoAula from "@/app/(frontend)/components/VideoAula";
import DeleteButton from "@/app/(frontend)/components/DeleteButton";
import DangerConfirmationDialog from "@/app/(frontend)/components/DangerConfirmationDialog";
import { useDisclosure } from "@nextui-org/modal";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/app/lib/api/axios";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";
import { IModulo } from "@/app/(backend)/interfaces/objects/IModule";
import { isAdmin, isSuperAdmin } from "@/app/lib/functions/isAdminOrSuper";
import { isMatriculadoOrMatriculaNotExpired } from "@/app/lib/functions/isMatriculadoOrMatriculaNotExpired.ts";

type VideoAulasPorModuloProps = {
  curso: ICurso;
  modulo: IModulo;
  userLogged: IUser;
};

export default function VideoAulasPorModulo({
  curso,
  userLogged,
  modulo,
}: VideoAulasPorModuloProps) {
  const router = useRouter();
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const { toast } = useToast();

  async function deleteAction() {
    const response = await api.delete(`/api/modulos/${modulo.id}`);

    console.log(response);

    toast({
      variant: "default",
      title: "Operação bem sucedida!",
      description: "Módulo Deletado com sucesso!",
      className: "bg-green-500 text-white border-1 border-green-800",
    });

    router.refresh();
  }

  return (
    <>
      <DangerConfirmationDialog
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        titulo="Aviso!"
        descricao={`Tem certeza que quer apagar o módulo "${modulo.titulo}"`}
        confirmationAction={deleteAction}
        // eslint-disable-next-line react/no-children-prop
        children={undefined}
      />
      <div key={modulo.id}>
        <div className="flex justify-between items-center">
          <H3>{modulo.titulo}</H3>
          {(isAdmin(userLogged) || isSuperAdmin(userLogged)) && (
            <div className="flex gap-1">
              <DeleteButton onPress={onOpen} />
              <AdicionarVideoAulaModalButton
                moduloId={modulo.id}
                nomeModulo={modulo.titulo}
              />
            </div>
          )}
        </div>
        <hr className="mt-3" />
        {modulo.videoAulas.length == 0 && (
          <div className="flex items-center justify-center mt-8">
            <p className="text-lg font-semibold text-center">
              Não há nenhuma vídeo aula neste módulo
            </p>
          </div>
        )}
        <div className="mt-4 mb-10 flex flex-col gap-3">
          {modulo.videoAulas.map((videoaula) => {
            return (
              <VideoAula
                matriculado={isMatriculadoOrMatriculaNotExpired(
                  curso,
                  userLogged
                )}
                userLogged={userLogged}
                videoaula={{ ...videoaula }}
                key={videoaula.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
