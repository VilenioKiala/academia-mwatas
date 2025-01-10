"use client";

import { HTMLAttributes } from "react";
import PrimaryButton from "./PrimaryButton";
import Link from "next/link";
import { api, apiUrl } from "@/app/lib/api/axios";
import { useDisclosure } from "@nextui-org/modal";
import DangerConfirmationDialog from "./DangerConfirmationDialog";
import { useToast } from "@/hooks/use-toast";
import DeleteButton from "./DeleteButton";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { isAdminOrSuper } from "@/app/lib/functions/isAdminOrSuper";

type CertificadoCardProps = {
  imagem: string;
  nomeUsuario: string;
  nome: string;
  sobrenome: string;
  nomeCurso: string;
  cursoId: string;
  id: string;
  userLogged: IUser;
} & HTMLAttributes<HTMLDivElement>;

export default function CertificadoCard({
  imagem,
  nomeUsuario,
  nome,
  sobrenome,
  nomeCurso,
  id,
  cursoId,
  userLogged,
  ...props
}: CertificadoCardProps) {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  const { toast } = useToast();

  async function deleteAction() {
    const response = await api.delete(`/api/certificados/${id}`);

    console.log(response);

    toast({
      variant: "default",
      title: "Operação bem sucedida!",
      description: "Certificado Deletado com sucesso!",
      className: "bg-green-500 text-white border-1 border-green-800",
    });
  }

  return (
    <div {...props} className={`min-w-60 relative ${props.className}`}>
      {isAdminOrSuper(userLogged) && (
        <>
          <DeleteButton
            className="absolute top-4 right-3 z-10"
            onPress={onOpen}
          />
          <DangerConfirmationDialog
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            titulo="Aviso!"
            descricao={`Tem certeza que quer apagar este certificado?`}
            confirmationAction={deleteAction}
            // eslint-disable-next-line react/no-children-prop
            children={undefined}
          />
        </>
      )}
      <div className="relative w-full h-52 overflow-hidden">
        <Link href={`/plataforma/certificados/imagem/${id}`}>
          <div
            className={`absolute w-full h-full top-0 left-0 bg-cover bg-center hover:scale-125 transition-all`}
            style={{
              backgroundImage: `url(${apiUrl}/storage/images/certificados/${imagem})`,
            }}
          />
        </Link>
      </div>
      <div className="mt-2">
        <p>
          <span className="font-semibold">Aluno: </span> @{nomeUsuario} - {nome}{" "}
          {sobrenome}
        </p>
        <p>
          <span className="font-semibold">Curso: </span>
          <Link
            href={`/plataforma/conteudos/${cursoId}?sidebar_small=true`}
            className="hover:text-blue-500 transition-all"
          >
            {nomeCurso}
          </Link>
        </p>
      </div>

      <div className="mt-8">
        <Link href={`certificados/imagem/${id}`}>
          <PrimaryButton className="mt-3">Ver Certificado</PrimaryButton>
        </Link>
      </div>
    </div>
  );
}
