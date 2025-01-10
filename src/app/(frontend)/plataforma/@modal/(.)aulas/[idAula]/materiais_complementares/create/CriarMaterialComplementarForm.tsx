"use client";

import H1 from "@/app/(frontend)/components/H1";
import InputText from "@/app/(frontend)/components/InputText";
import PrimaryButton from "@/app/(frontend)/components/PrimaryButton";
import { api } from "@/app/lib/api/axios";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@nextui-org/button";
import { Progress } from "@nextui-org/progress";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import * as yup from "yup";
import fileImage from "@/app/(frontend)/images/fileImage.png";
import Image from "next/image";

type CriarMaterialComplementarFormProps = {
  videoaulaId: string;
};

export default function CriarMaterialComplementarForm({
  videoaulaId,
}: CriarMaterialComplementarFormProps) {
  const router = useRouter();

  // Formik hooks and functions
  const formik = useFormik({
    initialValues: {
      titulo: "",
    },

    validationSchema: yup.object().shape({
      titulo: yup.string().trim().required(),
    }),

    onSubmit: (values) => {
      setLoading(true);

      const form = new FormData();

      form.append("titulo", values.titulo);
      form.append("videoaulaId", videoaulaId);
      form.append("ficheiro", ficheiro.file);

      api
        .post(`/api/materiais_complementares/`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast({
            variant: "default",
            title: "Operação bem sucedida!",
            description: "Material Complementar criado com sucesso!",
            className: "bg-green-500 text-white border-1 border-green-800",
          });

          router.refresh();

          router.back();
          router.push(
            `/plataforma/conteudos/aula/${videoaulaId}?sidebar_small=true`
          );
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });
  const { values, errors, touched, handleSubmit, handleChange } = formik;

  // States Hooks
  const [ficheiro, setFicheiro] = useState({
    loading: false,
    progress: 0,
    totalBytes: 0,
    file: undefined,
    error: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  return (
    <div className="my-10">
      <>
        <H1 className="">Adicionar Material Complementar</H1>

        <form method="post" onSubmit={handleSubmit}>
          <div className="flex-1 grid grid-cols-2 items-center gap-8">
            <div
              className={`bg-cover bg-center w-full h-80 flex flex-col items-center justify-center`}
            >
              {!ficheiro.loading ? (
                <div className="grid grid-cols-2 h-40">
                  {ficheiro.file && (
                    <div className="flex flex-col h-full">
                      <Image
                        src={fileImage.src}
                        alt={ficheiro.file.name}
                        width={fileImage.width}
                        height={fileImage.height}
                        className="h-full"
                      />
                      <p className="text-center font-semibold text-wrap">
                        {ficheiro.file.name.slice(0, 20)}...
                      </p>
                      {values.titulo && (
                        <p className="w-full text-center">
                          {values.titulo.slice(0, 30)}
                          {values.titulo.length > 30 && "..."}
                        </p>
                      )}
                    </div>
                  )}
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      const reader = new FileReader();

                      reader.onloadstart = (e: ProgressEvent<FileReader>) => {
                        console.log(e.total);
                        setFicheiro({
                          ...ficheiro,
                          progress: 0,
                          loading: true,
                          totalBytes: e.total,
                          error: "",
                        });
                      };

                      reader.onprogress = (e: ProgressEvent<FileReader>) => {
                        console.log(e.loaded);
                        setFicheiro({
                          ...ficheiro,
                          totalBytes: e.total,
                          loading: true,
                          progress: e.loaded,
                        });
                      };

                      reader.onloadend = () => {
                        setFicheiro({
                          ...ficheiro,
                          loading: false,
                          file: acceptedFiles[0],
                        });
                      };

                      reader.readAsArrayBuffer(acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section
                        className={`w-full h-full flex-1 ${
                          ficheiro.error && "border-danger"
                        }`}
                      >
                        <div
                          {...getRootProps({
                            className: `dropzone border-1 h-full flex items-center justify-center ${
                              ficheiro.error && "border-danger"
                            }`,
                          })}
                        >
                          <input {...getInputProps()} />
                          <p className="text-center">
                            Solte aqui ou clique para seleccionar o ficheiro
                          </p>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>
              ) : (
                <Progress
                  aria-label="Loading..."
                  maxValue={ficheiro.totalBytes}
                  value={ficheiro.progress}
                  showValueLabel
                  className="max-w-lg"
                />
              )}
              <p className="text-danger mt-2">
                {ficheiro.error && ficheiro.error}
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <InputText
                  label="Título: *"
                  placeholder="Digite o título do material complementar"
                  type="text"
                  name="titulo"
                  value={values.titulo}
                  onChange={handleChange}
                  className={`${
                    touched.titulo && errors.titulo && "border-danger"
                  }`}
                />
                <small className="text-danger">
                  {touched.titulo && errors.titulo && errors.titulo}
                </small>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              variant="light"
              color="danger"
              onPress={() => router.back()}
              type="button"
            >
              <span>Cancelar</span>
            </Button>

            <PrimaryButton
              loading={loading}
              type="submit"
              disabled={
                (ficheiro.loading ||
                  loading ||
                  errors.titulo ||
                  !ficheiro.file) as boolean
              }
            >
              Adicionar Material Complementar
            </PrimaryButton>
          </div>
        </form>
      </>
    </div>
  );
}
