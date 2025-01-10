"use client";

import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import Avatar from "@/app/(frontend)/components/Avatar";
import DangerConfirmationDialog from "@/app/(frontend)/components/DangerConfirmationDialog";
import { isAdminOrSuper } from "@/app/lib/functions/isAdminOrSuper";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import React from "react";
import Dropzone from "react-dropzone";
import noProfilePic from "@/app/(frontend)/images/noprofile.jpg";
import { appURL } from "@/app/lib/api/axios";
import { useToast } from "@/hooks/use-toast";
import { updateUser } from "@/app/lib/actions/user/updateUser";
import { useRouter } from "next/navigation";

type UserCardProps = {
  user: IUser;
  userLogged: IUser;
};

export default function UserCard({ user, userLogged }: UserCardProps) {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  async function salvarFotoPerfil() {
    if (profilePic.file) {
      setLoading(true);
      updateUser({ profilePic: profilePic.file, idUser: user.id })
        .then(() => {
          toast({
            variant: "default",
            title: "Operação bem sucedida!",
            description: "Foto de Perfil Actualizada com sucesso!",
            className: "bg-green-500 text-white border-1 border-green-800",
          });

          router.refresh();
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setProfilePic({
            loading: false,
            progress: 0,
            totalBytes: 0,
            file: undefined,
            error: "",
          });
          setLoading(false);
        });
    }
  }

  async function deleteAction() {
    updateUser({ profilePic: "", idUser: user.id })
      .then(() => {
        toast({
          variant: "default",
          title: "Operação bem sucedida!",
          description: "Foto de Perfil Removida com sucesso!",
          className: "bg-green-500 text-white border-1 border-green-800",
        });

        router.refresh();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const [profilePic, setProfilePic] = React.useState({
    loading: false,
    progress: 0,
    totalBytes: 0,
    file: undefined,
    error: "",
  });

  return (
    <div className="w-full h-fit col-start-1 col-span-full xl:col-span-2 2xl:col-span-1 flex flex-col items-center border border-black border-opacity-20 rounded-lg overflow-y-scroll dark:bg-gray-900">
      <div className="w-full h-52 bg-gray-100 relative dark:bg-gray-600">
        <div className="absolute top-3 right-3 flex gap-2">
          {((user.profilePic && user.id == userLogged.id) ||
            isAdminOrSuper(userLogged)) &&
            !profilePic.file && (
              <>
                <DangerConfirmationDialog
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  titulo="Aviso!"
                  descricao={`Tem certeza que pretende apagar a foto de perfil?"`}
                  confirmationAction={deleteAction}
                  // eslint-disable-next-line react/no-children-prop
                  children={undefined}
                />
                <Button color="danger" onPress={onOpen}>
                  Remover foto de perfil
                </Button>
              </>
            )}

          {profilePic.file && (
            <Button
              color="success"
              onPress={salvarFotoPerfil}
              disabled={loading}
            >
              Salvar
            </Button>
          )}
        </div>
      </div>

      {user.id == userLogged.id || isAdminOrSuper(userLogged) ? (
        <Dropzone
          onDrop={(acceptedFiles) => {
            const acceptedMimetypes = ["image/jpeg", "image/png"];

            if (!acceptedMimetypes.includes(acceptedFiles[0].type)) {
              return setProfilePic({
                ...profilePic,
                error: "O ficheiro deve ser uma foto, do tipo jpg ou png",
              });
            }
            const reader = new FileReader();

            reader.onloadstart = (e: ProgressEvent<FileReader>) => {
              setProfilePic({
                ...profilePic,
                progress: 0,
                loading: true,
                totalBytes: e.total,
                error: "",
              });
            };

            reader.onprogress = (e: ProgressEvent<FileReader>) => {
              setProfilePic({
                ...profilePic,
                totalBytes: e.total,
                loading: true,
                progress: e.loaded,
              });
            };

            reader.onloadend = () => {
              setProfilePic({
                ...profilePic,
                loading: false,
                file: acceptedFiles[0],
              });
            };

            reader.readAsArrayBuffer(acceptedFiles[0]);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section
              className={`w-full h-52 mt-[-6rem] relative z-10 flex items-center justify-center rounded-full ${
                profilePic.error && "border-danger"
              }`}
            >
              <div
                {...getRootProps({
                  className: `dropzone border-1 w-52 h-52 rounded-full flex items-center justify-center bg-cover border-myblue bg-center ${
                    profilePic.error && "border-danger"
                  }`,
                  style: {
                    backgroundImage: profilePic.file
                      ? `url(${URL.createObjectURL(profilePic.file)})`
                      : !user.profilePic
                        ? `url(${noProfilePic.src})`
                        : `url(${appURL}/storage/images/profile_pic/${user.profilePic})`,
                  },
                })}
              >
                <input {...getInputProps()} />
              </div>
            </section>
          )}
        </Dropzone>
      ) : (
        <Avatar
          className="p-20 mt-[-6rem] relative z-10"
          foto={user.profilePic as string}
        />
      )}

      <p className="capitalize text-center text-xl font-semibold mt-3">
        {user.nome} {user.sobrenome}
      </p>
      <p className="text-center mb-4">@{user.nomeUsuario}</p>

      <div className="flex flex-col gap-2">
        {user.genero && <p className="text-center">Genero: {user.genero}</p>}

        {user.dataNascimento && (
          <p className="text-center">
            {new Date(user.dataNascimento).getDate()}/
            {new Date(user.dataNascimento).getMonth()}/
            {new Date(user.dataNascimento).getFullYear()}{" "}
            <span className="font-semibold">{` (${
              new Date().getFullYear() -
              new Date(user.dataNascimento).getFullYear()
            } anos)`}</span>
          </p>
        )}

        {isAdminOrSuper(userLogged) && user.numeroTelefone && (
          <p className="text-center">+244 {` ${user.numeroTelefone}`}</p>
        )}
      </div>
    </div>
  );
}
