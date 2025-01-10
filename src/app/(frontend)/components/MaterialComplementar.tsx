"use client";

import { IMaterialComplementar } from "@/app/(backend)/interfaces/objects/IMaterialComplementar";
import { api } from "@/app/lib/api/axios";
import React from "react";
import fileDownload from "js-file-download";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import fileImage from "@/app/(frontend)/images/fileImage.png";
import DeleteButton from "./DeleteButton";
import DangerConfirmationDialog from "./DangerConfirmationDialog";
import Image from "next/image";
import { useDisclosure } from "@nextui-org/modal";
import { useToast } from "@/hooks/use-toast";

type MaterialComplementarProps = {
  materialComplementar: IMaterialComplementar;
  userLogged: IUser;
};

export default function MaterialComplementar({
  materialComplementar,
  userLogged,
}: MaterialComplementarProps) {
  const { onOpen, onOpenChange, isOpen } = useDisclosure();
  const { toast } = useToast();

  async function deleteAction() {
    const response = await api.delete(
      `/api/materiais_complementares/${materialComplementar.id}`
    );

    console.log(response);

    toast({
      variant: "default",
      title: "Operação bem sucedida!",
      description: "Material Complementar Deletado com sucesso!",
      className: "bg-green-500 text-white border-1 border-green-800",
    });
  }

  async function handleClick() {
    await api
      .get(
        `/storage/materiais_complementares/${materialComplementar.ficheiro}`,
        { responseType: "blob" }
      )
      .then((response) => {
        fileDownload(response.data, materialComplementar.ficheiro);
      });
  }

  return (
    <>
      <DangerConfirmationDialog
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        titulo="Aviso!"
        descricao={`Tem certeza que quer apagar o material complementar "${materialComplementar.titulo}"`}
        confirmationAction={deleteAction}
        // eslint-disable-next-line react/no-children-prop
        children={undefined}
      />
      <button
        className="cursor-pointer relative hover:bg-gray-300 transition-all"
        onClick={handleClick}
        key={materialComplementar.id}
      >
        {userLogged.privilegio.toLowerCase() == "admin" ||
          (userLogged.privilegio.toLowerCase() == "superadmin" && (
            <div className="absolute top-2 right-0 z-10 flex flex-col gap-2">
              <DeleteButton onPress={onOpen} />
            </div>
          ))}
        <div className="flex flex-col">
          <Image
            src={fileImage.src}
            alt={materialComplementar.ficheiro}
            width={fileImage.width}
            height={fileImage.height}
            className="h-32 w-32 block m-auto"
          />
          <p className="text-center font-semibold text-wrap">
            {materialComplementar.titulo.slice(0, 20)}...
          </p>
        </div>
      </button>
    </>
  );
}
