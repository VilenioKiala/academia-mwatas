"use client";

import React, { Dispatch, SetStateAction } from "react";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import PrimaryButton from "../components/PrimaryButton";
import { Button } from "@material-tailwind/react";
import H3 from "../components/H3";
import Dropzone from "react-dropzone";
import { useRouter } from "next/navigation";
import {
  isAdminOrSuper,
  isAluno,
  isProfessor,
} from "@/app/lib/functions/isAdminOrSuper";
import { updateUser } from "@/app/lib/actions/user/updateUser";
import { useToast } from "@/hooks/use-toast";

type StepThreeFormProps = {
  userLogged: IUser;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

export default function StepThreeForm({
  loading,
  userLogged,
  setLoading,
}: StepThreeFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [profilePic, setProfilePic] = React.useState({
    loading: false,
    progress: 0,
    totalBytes: 0,
    file: undefined,
    error: "",
  });

  async function handleClickSalvar() {
    setLoading(true);

    if (profilePic.file) {
      await updateUser({ idUser: userLogged.id, profilePic: profilePic.file })
        .then(() => {
          toast({
            variant: "default",
            title: "Operação bem sucedida!",
            description: "Informações salvas com sucesso!",
            className: "bg-green-500 text-white border-1 border-green-800",
          });

          if (isAdminOrSuper(userLogged)) {
            router.replace("/plataforma/conteudos");
          }

          if (isAluno(userLogged) || isProfessor(userLogged)) {
            router.replace("/plataforma/");
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  function handleClickIgnorar() {
    toast({
      variant: "default",
      title: "Operação bem sucedida!",
      description: "Informações salvas com sucesso!",
      className: "bg-green-500 text-white border-1 border-green-800",
    });

    if (isAdminOrSuper(userLogged)) {
      router.replace("/plataforma/conteudos");
    }

    if (isAluno(userLogged) || isProfessor(userLogged)) {
      router.replace("/plataforma/");
    }
  }

  return (
    <>
      <H3 className="mt-8 font-semibold">Actualize a sua foto de perfil</H3>
      <div className="flex flex-col items-center justify-center">
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
              console.log(e.total);
              setProfilePic({
                ...profilePic,
                progress: 0,
                loading: true,
                totalBytes: e.total,
                error: "",
              });
            };

            reader.onprogress = (e: ProgressEvent<FileReader>) => {
              console.log(e.loaded);
              setProfilePic({
                ...profilePic,
                totalBytes: e.total,
                loading: true,
                progress: e.loaded,
                error: "",
              });
            };

            reader.onloadend = () => {
              setProfilePic({
                ...profilePic,
                loading: false,
                file: acceptedFiles[0],
                error: "",
              });
            };

            reader.readAsArrayBuffer(acceptedFiles[0]);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section
              className={`w-full h-52 flex items-center justify-center rounded-full ${
                profilePic.error && "border-danger"
              }`}
            >
              <div
                {...getRootProps({
                  className: `dropzone border-1 border-black w-52 h-52 rounded-full cursor-pointer flex items-center justify-center bg-cover bg-center ${
                    profilePic.error && "border-danger"
                  }`,
                  style: {
                    backgroundImage:
                      profilePic.file &&
                      `url(${URL.createObjectURL(profilePic.file)})`,
                  },
                })}
              >
                <input {...getInputProps()} />
                <p className="text-center">
                  Solte aqui ou clique para seleccionar a foto de perfil
                </p>
              </div>
            </section>
          )}
        </Dropzone>
        <small className="text-red-500 text-center">
          {profilePic.error && profilePic.error}
        </small>
      </div>
      <div className="text-center mt-2">
        <p className="text-xl font-bold capitalize">
          {userLogged.nome} {userLogged.sobrenome}
        </p>
        <p className="text-lg font-semibold capitalize">
          {userLogged.nomeUsuario && `@${userLogged.nomeUsuario}`}
        </p>
        <div className="py-6 flex justify-between items-center">
          <Button
            variant="text"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={handleClickIgnorar}
          >
            Ignorar
          </Button>
          <PrimaryButton
            disabled={loading}
            type="button"
            onClick={handleClickSalvar}
          >
            Salvar Informações
          </PrimaryButton>
        </div>
      </div>
    </>
  );
}
