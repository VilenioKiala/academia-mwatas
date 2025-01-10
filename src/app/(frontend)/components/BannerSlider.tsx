"use client";
import { api, apiUrl } from "@/app/lib/api/axios";
import { Button, Carousel } from "@material-tailwind/react";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { useDisclosure } from "@nextui-org/modal";
import DangerConfirmationDialog from "./DangerConfirmationDialog";
import H3 from "./H3";
import PrimaryButton from "./PrimaryButton";
import Separator from "./Separator";
import { PlusIcon } from "../icons/PlusIcon";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { IElementoBanner } from "@/app/(backend)/interfaces/objects/IElementoBanner";
import AddElementoBannerModal from "../plataforma/conteudos/AddElementoBannerModal";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";

type BannerSlider = {
  cursos: ICurso[];
  elements: IElementoBanner[];
  userLogged: IUser;
};

export default function BannerSlider({
  userLogged,
  cursos,
  elements,
}: BannerSlider) {
  const router = useRouter();
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const { toast } = useToast();
  const [bannerElementIdClicked, setBannerElementIdClicked] =
    React.useState("");

  async function deleteAction() {
    const response = await api.delete(
      `/api/elementosbanner/${bannerElementIdClicked}`
    );

    console.log(response);

    toast({
      variant: "default",
      title: "Operação bem sucedida!",
      description: "Elemento do Banner Deletado com sucesso!",
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
        descricao={`Tem certeza que quer apagar?`}
        confirmationAction={deleteAction}
        // eslint-disable-next-line react/no-children-prop
        children={undefined}
      ></DangerConfirmationDialog>

      {elements.length == 0 ? (
        userLogged?.privilegio == "admin" ||
        (userLogged?.privilegio == "superadmin" && (
          <div className="flex flex-col gap-3 my-16">
            <div className="flex justify-between">
              <H3>Banner</H3>
              <AddElementoBannerModal cursos={cursos}>
                <PrimaryButton>Adicionar elemento ao Banner</PrimaryButton>
              </AddElementoBannerModal>
            </div>
            <Separator />
            <p className="text-center">Não há nenhum elemento no banner</p>
          </div>
        ))
      ) : (
        <Carousel
          className="rounded-xl h-96 relative"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {elements.map((element: IElementoBanner) => {
            return (
              <>
                {userLogged.privilegio.toLowerCase() == "admin" ||
                  (userLogged.privilegio.toLowerCase() == "superadmin" && (
                    <div className="absolute top-2 right-2">
                      <DeleteButton
                        onPress={() => {
                          setBannerElementIdClicked(element.id);
                          onOpen();
                        }}
                      />
                      <AddElementoBannerModal cursos={cursos}>
                        <Button
                          variant="outlined"
                          color="black"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                          className="h-full"
                        >
                          <PlusIcon width="1.5em" height="1.5em" />
                        </Button>
                      </AddElementoBannerModal>
                    </div>
                  ))}
                <Link
                  key={element.id}
                  className="h-full w-full"
                  href={
                    element.link
                      ? `https://${element.link}`
                      : `/plataforma/conteudos/${element.cursoId}?sidebar_small=true`
                  }
                  target="_blank"
                >
                  <div
                    style={{
                      backgroundImage: `url(${apiUrl}/storage/images/elementoBannerPhotos/${element.photo}`,
                    }}
                    className="h-full w-full bg-cover bg-center"
                  />
                </Link>
              </>
            );
          })}
        </Carousel>
      )}
    </>
  );
}
