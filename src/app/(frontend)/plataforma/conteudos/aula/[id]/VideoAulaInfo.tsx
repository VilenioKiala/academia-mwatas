"use client";

import { IVideoAula } from "@/app/(backend)/interfaces/objects/IVideoAula";
import H1 from "@/app/(frontend)/components/H1";
import Separator from "@/app/(frontend)/components/Separator";
import { PlusIcon } from "@/app/(frontend)/icons/PlusIcon";
import {
  Button,
  Rating,
  Tab,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import React from "react";
import { IMaterialComplementar } from "@/app/(backend)/interfaces/objects/IMaterialComplementar";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import MaterialComplementar from "@/app/(frontend)/components/MaterialComplementar";
import { useRouter } from "next/navigation";
import { api } from "@/app/lib/api/axios";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@nextui-org/theme";
import { Checkbox } from "@nextui-org/checkbox";
import AddMaterialComplementarModal from "./AddMaterialComplementarModal";
import {
  isAdminOrSuper,
  isAluno,
  isProfessor,
} from "@/app/lib/functions/isAdminOrSuper";

type VideoAulaInfoProps = {
  videoaula: IVideoAula;
  userLogged: IUser;
};

export default function VideoAulaInfo({
  videoaula,
  userLogged,
}: VideoAulaInfoProps) {
  const [activeTab, setActiveTab] = React.useState<
    "descricao" | "materiais_complementares"
  >("descricao");
  const [assistidaLoading, setAssistidaLoading] =
    React.useState<boolean>(false);
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const [, setStarRating] = React.useState<number>(0);
  const { toast } = useToast();

  const router = useRouter();

  React.useEffect(() => {
    const visualizacoes = videoaula.visualizacoes.filter(
      (visualizacao) => visualizacao.userId == userLogged.id
    );

    if (visualizacoes.length == 0) {
      return setIsSelected(false);
    }
    return setIsSelected(true);
  }, []);

  async function assistidaSelected() {
    setAssistidaLoading(true);

    const visualizacaoExiste = (
      await api.get(
        `/api/visualizacoes?userId=${userLogged.id}&videoaulaId=${videoaula.id}`
      )
    ).data;

    if (visualizacaoExiste.length == 0) {
      await api.post(`/api/visualizacoes/`, {
        userId: userLogged.id,
        videoaulaId: videoaula.id,
      });

      toast({
        variant: "default",
        title: "Operação bem sucedida!",
        description: "Aula Marcada como assistida!",
        className: "bg-green-500 text-white border-1 border-green-800",
      });

      setAssistidaLoading(false);
      return setIsSelected(true);
    }

    await api.delete(`/api/visualizacoes/${visualizacaoExiste[0].id}`);

    toast({
      variant: "default",
      title: "Operação bem sucedida!",
      description: "Não assistida!",
      className: "bg-green-500 text-white border-1 border-green-800",
    });

    setAssistidaLoading(false);
    setIsSelected(false);

    router.refresh();
  }

  async function ratingChanged(newRating: number) {
    await api.post(`/api/avaliacoes/`, {
      nota: newRating,
      userId: userLogged.id,
      videoAulaId: videoaula.id,
    });

    toast({
      variant: "default",
      title: "Operação bem sucedida!",
      description: "Avaliado com sucesso!",
      className: "bg-green-500 text-white border-1 border-green-800",
    });

    setStarRating(newRating);

    router.refresh();
  }

  return (
    <>
      <div className="grid grid-cols-5 px-5 gap-8 lg:px-0">
        <div className="col-start-1 col-span-full lg:col-end-4">
          <div className="mt-5 flex flex-col">
            <p className="text-sm">Aula</p>

            <div className="flex flex-col gap-y-2">
              <H1>{videoaula.titulo}</H1>
            </div>
            <div className="mt-6 mb-16">
              <Tabs value={activeTab}>
                <TabsHeader
                  className="rounded-none text-left border-b border-blue-gray-50 bg-transparent"
                  indicatorProps={{
                    className:
                      "bg-transparent border-b-2 border-myblue shadow-none rounded-none",
                  }}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <Tab
                    value="descricao"
                    onClick={() => setActiveTab("descricao")}
                    className={
                      activeTab === "descricao"
                        ? "text-myblue p-4 text-left"
                        : "p-4 text-left"
                    }
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Descrição
                  </Tab>

                  <Tab
                    value="materiais_complementares"
                    onClick={() => setActiveTab("materiais_complementares")}
                    className={
                      activeTab === "materiais_complementares"
                        ? "text-myblue p-4 text-left"
                        : "p-4 text-left"
                    }
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Materiais Complementares
                  </Tab>
                </TabsHeader>
                <Separator />
                <TabsBody
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  className="pt-4"
                >
                  {activeTab == "descricao" && (
                    <div>
                      {videoaula.descricao ? (
                        <p>{videoaula.descricao}</p>
                      ) : (
                        <p className="font-semibold text-center mt-4">
                          Vídeo Aula Sem Descrição
                        </p>
                      )}
                    </div>
                  )}

                  {activeTab == "materiais_complementares" && (
                    <div className="grid grid-cols-2 gap-8 justify-center flex-wrap">
                      {videoaula.materiaisComplementares.map(
                        (materialComplementar: IMaterialComplementar) => {
                          return (
                            <MaterialComplementar
                              key={materialComplementar.id}
                              materialComplementar={{ ...materialComplementar }}
                              userLogged={{ ...userLogged }}
                            />
                          );
                        }
                      )}
                      {isAdminOrSuper(userLogged) && (
                        <AddMaterialComplementarModal
                          videoaulaId={videoaula.id}
                        >
                          <Button
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            type="button"
                            variant="outlined"
                          >
                            <PlusIcon
                              width={"4em"}
                              height={"4em"}
                              className="w-[6em] h-[6em]"
                            />
                          </Button>
                        </AddMaterialComplementarModal>
                      )}

                      {(isAluno(userLogged) || isProfessor(userLogged)) &&
                        videoaula.materiaisComplementares.length == 0 && (
                          <p className="font-bold">
                            Nenhum material complementar para esta aula
                          </p>
                        )}
                    </div>
                  )}
                </TabsBody>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="col-start-4 col-span-full flex flex-col gap-8 items-center justify-center">
          <Checkbox
            disabled={assistidaLoading}
            isDisabled={assistidaLoading}
            color="success"
            aria-label="{user.name}"
            className="border-black border-1 border-opacity-50 flex justify-center ml-8"
            classNames={{
              base: cn(
                "inline-flex w-full max-w-md bg-content1 flex justify-center",
                "hover:bg-content2 items-center justify-center",
                "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                "data-[selected=true]:border-success"
              ),
              wrapper: cn("flex items-center justify-center"),
              // label: "w-full",
            }}
            isSelected={isSelected}
            onValueChange={assistidaSelected}
          >
            <div className="w-full flex justify-between gap-2">
              <p>Aula Assistida</p>
            </div>
          </Checkbox>
          <div className="flex flex-col items-center justify-center">
            <p className="text-center">O que achou da aula?</p>
            <Rating
              className="mt-2"
              value={
                videoaula.avaliacoes.filter(
                  (avaliacao) => avaliacao.userId == userLogged.id
                )[0]?.nota || 0
              }
              unratedColor="amber"
              ratedColor="amber"
              onChange={ratingChanged}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              placeholder={undefined}
            />
          </div>
        </div>
      </div>
    </>
  );
}
