"use client";

import React from "react";
import AdicionarCursoModalButton from "./AdicionarCursoModalButton";
import H3 from "@/app/(frontend)/components/H3";
import Separator from "@/app/(frontend)/components/Separator";
import ContentCard from "../../components/ContentCard";
import DangerConfirmationDialog from "../../components/DangerConfirmationDialog";
import { useDisclosure } from "@nextui-org/modal";
import { api } from "@/app/lib/api/axios";
import { useToast } from "@/hooks/use-toast";
import DeleteButton from "../../components/DeleteButton";
import { useRouter } from "next/navigation";
import EditIcon from "../../icons/EditIcon";
import { Button } from "@material-tailwind/react";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import EditarCategoriaModal from "./EditarCategoriaModal";
import { ICategoria } from "@/app/(backend)/interfaces/objects/ICategoria";
import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";
import {
  isAdminOrSuper,
  isAluno,
  isProfessor,
} from "@/app/lib/functions/isAdminOrSuper";
import Link from "next/link";
import RightArrowIcon from "../../icons/RightArrowIcon";

type ConteudosPorCategoriaProps = {
  categorias: ICategoria[];
  categoria: ICategoria;
  userLogged: IUser;
};

export default function ConteudosPorCategoria({
  categorias,
  userLogged,
  categoria,
}: ConteudosPorCategoriaProps) {
  const router = useRouter();
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const { toast } = useToast();

  function calcNumeroAulas(curso: ICurso) {
    let qtd = 0;

    curso.modulos.map((modulo) => {
      modulo.videoAulas.map(() => {
        qtd += 1;
      });
    });

    return qtd;
  }

  async function deleteAction() {
    const response = await api.delete(`/api/categorias/${categoria.id}`);

    console.log(response);

    toast({
      variant: "default",
      title: "Operação bem sucedida!",
      description: "Categoria Deletada com sucesso!",
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
        descricao={`Tem certeza que quer apagar a categoria "${categoria.titulo}"`}
        confirmationAction={deleteAction}
        // eslint-disable-next-line react/no-children-prop
        children={undefined}
      />
      <div className="w-full" key={categoria.id.toString()}>
        <div className="flex justify-between items-center mt-16">
          <H3 className="capitalize text-foreground">{categoria.titulo}</H3>
          {(isAluno(userLogged) || isProfessor(userLogged)) && (
            <Link
              href={`/plataforma/categorias/${categoria.id}`}
              className="flex items-center hover:text-myblue hover:fill-myblue hover:stroke-myblue text-foreground"
            >
              <p>Ver mais Cursos</p>
              <RightArrowIcon />
            </Link>
          )}

          {isAdminOrSuper(userLogged) && (
            <div className="flex items-center gap-1 h-full">
              <EditarCategoriaModal categoria={{ ...categoria }}>
                <Button
                  variant="outlined"
                  color="black"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  className="h-full"
                >
                  <EditIcon width="1.5em" height="1.5em" />
                </Button>
              </EditarCategoriaModal>
              <DeleteButton onPress={onOpen} />
              <AdicionarCursoModalButton
                categoriaId={categoria.id}
                nomeCategoria={categoria.titulo}
              />
            </div>
          )}
        </div>
        <Separator className="my-3 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-x-6 gap-y-12 flex-wrap text-foreground">
          {categoria.cursos.length == 0 && (
            <div className="flex justify-center items-center w-full my-5">
              <p className="text-lg">
                Não há nenhum conteudo registado desta categoria
              </p>
            </div>
          )}
          {categoria.cursos.map((curso: ICurso) => {
            return (
              <>
                <div key={curso.id} className="">
                  <ContentCard
                    curso={{ ...curso }}
                    numeroModulos={curso.modulos.length}
                    numeroAulas={calcNumeroAulas(curso)}
                    className="flex-1"
                    key={curso.id.toString()}
                    userLogged={{ ...userLogged }}
                    categorias={categorias}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
