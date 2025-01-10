"use client";

import { HTMLAttributes } from "react";
import H3 from "./H3";
import PrimaryButton from "./PrimaryButton";
import Link from "next/link";
import { api, apiUrl } from "@/app/lib/api/axios";
import DeleteButton from "./DeleteButton";
import { useDisclosure } from "@nextui-org/modal";
import DangerConfirmationDialog from "./DangerConfirmationDialog";
import { useToast } from "@/hooks/use-toast";
import EditIcon from "../icons/EditIcon";
import { Button } from "@material-tailwind/react";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import EditarCursoModal from "../plataforma/conteudos/EditarCursoModal";
import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";
import { ICategoria } from "@/app/(backend)/interfaces/objects/ICategoria";
import { isAdminOrSuper } from "@/app/lib/functions/isAdminOrSuper";
// import { Button } from "@nextui-org/button";

type ContentCardProps = {
  curso: ICurso;
  numeroAulas: number;
  numeroModulos: number;
  userLogged: IUser;
  categorias: ICategoria[];
} & HTMLAttributes<HTMLDivElement>;

export default function ContentCard({
  curso,
  numeroAulas,
  numeroModulos,
  userLogged,
  categorias,
  ...props
}: ContentCardProps) {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  const { toast } = useToast();

  async function deleteAction() {
    await api.delete(`/api/cursos/${curso.id}`);

    toast({
      variant: "default",
      title: "Operação bem sucedida!",
      description: "Curso Deletado com sucesso!",
      className: "bg-green-500 text-white border-1 border-green-800",
    });
  }

  return (
    <div
      {...props}
      className={`min-w-60 relative dark:bg-gray-900 p-2 h-fit rounded-xl text-foreground ${props.className}`}
    >
      {isAdminOrSuper(userLogged) && (
        <div className="absolute top-2 right-0 z-10 flex flex-col gap-2">
          <DeleteButton onPress={onOpen} />

          <EditarCursoModal categorias={[...categorias]} curso={{ ...curso }}>
            <Button
              variant="filled"
              color="black"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <EditIcon width="2em" height="2em" />
            </Button>
          </EditarCursoModal>
        </div>
      )}

      <DangerConfirmationDialog
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        titulo="Aviso!"
        descricao={`Tem certeza que quer apagar o Curso "${curso.titulo}"`}
        confirmationAction={deleteAction}
        // eslint-disable-next-line react/no-children-prop
        children={undefined}
      />
      <div className="relative w-full h-52 overflow-hidden">
        <Link
          href={`/plataforma/conteudos/${curso.id}?sidebar_small=true`}
          className={`absolute w-full h-full top-0 left-0 bg-cover bg-center hover:scale-125 transition-all`}
          style={{
            backgroundImage: `url(${apiUrl}/storage/images/cover_curso/${curso.coverCurso})`,
          }}
        />
      </div>
      <div>
        <p>{"Curso"}</p>
        <Link
          href={`/plataforma/conteudos/${curso.id}?sidebar_small=true`}
          className=""
        >
          <H3>{curso.titulo}</H3>
        </Link>
      </div>

      <div className="mt-8">
        <p>
          {numeroAulas ? `${numeroAulas} Aulas | ` : ""}
          {numeroModulos} Módulos
        </p>
        <Link href={`/plataforma/conteudos/${curso.id}?sidebar_small=true`}>
          <PrimaryButton className="mt-3">Ver Curso</PrimaryButton>
        </Link>
      </div>
    </div>
  );
}
