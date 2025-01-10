import { IVideoAula } from "@/app/(backend)/interfaces/objects/IVideoAula";
import Link from "next/link";
import React from "react";
import patternLittle from "@/app/(frontend)/images/pattern-little.png";
import DeleteButton from "./DeleteButton";
import { api } from "@/app/lib/api/axios";
import { useDisclosure } from "@nextui-org/modal";
import { useToast } from "@/hooks/use-toast";
import DangerConfirmationDialog from "./DangerConfirmationDialog";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { isAdminOrSuper } from "@/app/lib/functions/isAdminOrSuper";
import { isVideoAulaAgendadaParaDepois } from "@/app/lib/functions/isAgendadoParaDepois";
import { formatDateTime } from "@/app/lib/functions/formatDateTime";

type VideoAulaProps = {
  matriculado: boolean;
  videoaula: IVideoAula;
  userLogged: IUser;
};

export default function VideoAula({
  matriculado,
  videoaula,
  userLogged,
}: VideoAulaProps) {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  console.log("matriculado", matriculado);

  const { toast } = useToast();

  async function deleteAction() {
    const response = await api.delete(`/api/videoaulas/${videoaula.id}`);

    console.log(response);

    toast({
      variant: "default",
      title: "Operação bem sucedida!",
      description: "Curso Deletado com sucesso!",
      className: "bg-green-500 text-white border-1 border-green-800",
    });
  }

  return (
    <>
      <DangerConfirmationDialog
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        titulo="Aviso!"
        descricao={`Tem certeza que quer apagar a video aula "${videoaula.titulo}"`}
        confirmationAction={deleteAction}
        // eslint-disable-next-line react/no-children-prop
        children={undefined}
      />
      <div
        className={`${
          isVideoAulaAgendadaParaDepois(videoaula) && "opacity-55"
        } grid grid-cols-8 relative w-full min-h-36 gap-5 items-center rounded-3xl overflow-hidden bg-[#FAFAFA] dark:bg-gray-800`}
        style={{
          border: "0.5px solid rgba(0, 0, 0, 0.20)",
          borderRadius: "16px",
        }}
      >
        {videoaula.visualizacoes.map(
          (visualizacao) => visualizacao.userId == userLogged.id
        ).length > 0 && (
          <div className="absolute top-3 right-3 rounded-xl p-2 flex items-center justify-center text-success-900 bg-success-300">
            <small>Assistida</small>
          </div>
        )}
        {isAdminOrSuper(userLogged) && (
          <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
            <DeleteButton onPress={onOpen} />
          </div>
        )}

        <div className="col-start-1 col-span-2 w-full h-full">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${patternLittle.src})`,
            }}
          ></div>
        </div>
        <div className="col-start-3 col-span-full flex flex-col gap-y-2">
          <Link
            href={`${
              (matriculado && !isVideoAulaAgendadaParaDepois(videoaula)) ||
              isAdminOrSuper(userLogged)
                ? `/plataforma/conteudos/aula/${videoaula.id}?sidebar_small=true`
                : "#"
            }`}
          >
            <h4 className="font-semibold">{videoaula.titulo}</h4>
          </Link>
          {videoaula.descricao && <p>{videoaula.descricao.slice(0, 100)}...</p>}
          {isVideoAulaAgendadaParaDepois(videoaula) && (
            <small className="text-sm opacity-70">
              Agendado para{" "}
              {formatDateTime(new Date(videoaula.dataAgendamento))}
            </small>
          )}
        </div>
      </div>
    </>
  );
}
