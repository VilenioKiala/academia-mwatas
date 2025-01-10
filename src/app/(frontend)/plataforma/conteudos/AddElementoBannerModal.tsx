"use client";

import { ICourse } from "@/app/(backend)/interfaces/objects/ICourse";
import InputText from "@/app/(frontend)/components/InputText";
import PrimaryButton from "@/app/(frontend)/components/PrimaryButton";
import { api } from "@/app/lib/api/axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Tab, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { Button } from "@nextui-org/button";
import { Progress } from "@nextui-org/progress";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import * as yup from "yup";

type AddElementoBannerModalProps = {
  children: React.ReactNode;
  cursos: ICourse[];
};

export default function AddElementoBannerModal({
  cursos,
  children,
}: AddElementoBannerModalProps) {
  const [activeTab, setActiveTab] = React.useState<"curso" | "link">("curso");

  const router = useRouter();

  // Formik hooks and functions
  const formik = useFormik({
    initialValues: {
      link: "",
      cursoId: "",
    },

    validationSchema: yup.object().shape({
      link:
        activeTab == "link" &&
        yup
          .string()
          .trim()
          .required()
          .matches(
            /(www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/,
            "O link deve ser uma url válida"
          ),
      cursoId: activeTab == "curso" && yup.string().trim().required(),
    }),

    onSubmit: (values) => {
      setLoading(true);

      const form = new FormData();

      if (activeTab == "link") {
        form.append("link", values.link);
      }

      if (activeTab == "curso") {
        form.append("cursoId", values.cursoId);
      }

      form.append("photo", photo.file);

      api
        .post(`/api/elementosbanner/`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((elementoBannerCreated) => {
          console.log(elementoBannerCreated);

          toast({
            variant: "default",
            title: "Operação bem sucedida!",
            description: "Elemento do banner adicionado com sucesso!",
            className: "bg-green-500 text-white border-1 border-green-800",
          });

          router.refresh();

          router.back();
          router.push("/plataforma/conteudos");
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });
  const { values, errors, touched, handleSubmit, handleChange, setValues } =
    formik;

  // States Hooks
  const [photo, setPhoto] = useState({
    loading: false,
    progress: 0,
    totalBytes: 0,
    file: undefined,
    error: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  return (
    <div>
      {" "}
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-semibold text-2xl">
              Adicionar Elemento ao banner
            </DialogTitle>
            <DialogDescription>
              <form method="post" onSubmit={handleSubmit}>
                <div className="flex-1 grid grid-cols-2 items-center gap-8">
                  <div
                    className={`bg-cover bg-center w-full h-80 flex flex-col items-center justify-center`}
                    style={{
                      backgroundImage:
                        photo.file && `url(${URL.createObjectURL(photo.file)})`,
                    }}
                  >
                    {!photo.loading ? (
                      <>
                        <Dropzone
                          onDrop={(acceptedFiles) => {
                            const acceptedMimetypes = [
                              "image/jpeg",
                              "image/png",
                            ];

                            if (
                              !acceptedMimetypes.includes(acceptedFiles[0].type)
                            ) {
                              return setPhoto({
                                ...photo,
                                error:
                                  "O ficheiro deve ser uma foto, do tipo jpg ou png",
                              });
                            }
                            const reader = new FileReader();

                            reader.onloadstart = (
                              e: ProgressEvent<FileReader>
                            ) => {
                              console.log(e.total);
                              setPhoto({
                                ...photo,
                                progress: 0,
                                loading: true,
                                totalBytes: e.total,
                                error: "",
                              });
                            };

                            reader.onprogress = (
                              e: ProgressEvent<FileReader>
                            ) => {
                              console.log(e.loaded);
                              setPhoto({
                                ...photo,
                                totalBytes: e.total,
                                loading: true,
                                progress: e.loaded,
                              });
                            };

                            reader.onloadend = () => {
                              setPhoto({
                                ...photo,
                                loading: false,
                                file: acceptedFiles[0],
                              });
                            };

                            reader.readAsArrayBuffer(acceptedFiles[0]);
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <section
                              className={`w-full h-full ${
                                photo.error && "border-danger"
                              }`}
                            >
                              <div
                                {...getRootProps({
                                  className: `dropzone border-1 h-full flex items-center justify-center ${
                                    photo.error && "border-danger"
                                  }`,
                                })}
                              >
                                <input {...getInputProps()} />
                                <p>
                                  Solte aqui ou clique para seleccionar a imagem
                                  do Elemento do banner
                                </p>
                              </div>
                            </section>
                          )}
                        </Dropzone>
                      </>
                    ) : (
                      <Progress
                        aria-label="Loading..."
                        maxValue={photo.totalBytes}
                        value={photo.progress}
                        showValueLabel
                        className="max-w-lg"
                      />
                    )}
                    <p className="text-danger mt-2">
                      {photo.error && photo.error}
                    </p>
                  </div>
                  <div className="flex flex-col gap-5">
                    <Tabs value={activeTab}>
                      <TabsHeader
                        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                        indicatorProps={{
                          className:
                            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                        }}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <Tab
                          value="curso"
                          onClick={() => setActiveTab("curso")}
                          className={
                            activeTab === "curso" ? "text-gray-900" : ""
                          }
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          Redirecionar para Curso
                        </Tab>

                        <Tab
                          value="link"
                          onClick={() => setActiveTab("link")}
                          className={
                            activeTab === "link" ? "text-gray-900" : ""
                          }
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          Redirecionar para um link
                        </Tab>
                      </TabsHeader>
                      <TabsBody
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        className="pt-4"
                      >
                        {activeTab == "link" && (
                          <div>
                            <InputText
                              label="Link: *"
                              placeholder="academiamwatas.com"
                              type="text"
                              name="link"
                              value={values.link}
                              leftIcon={<p className="opacity-45">https://</p>}
                              onChange={handleChange}
                              className={`${
                                touched.link && errors.link && "border-danger"
                              }`}
                            />
                            <small className="text-danger">
                              {touched.link && errors.link && errors.link}
                            </small>
                          </div>
                        )}

                        {activeTab == "curso" && (
                          <div>
                            <label className="flex flex-col gap-1">
                              <p>Curso:</p>
                              <Select
                                onValueChange={(value) => {
                                  setValues({ ...values, cursoId: value });
                                }}
                                value={values.cursoId}
                              >
                                <SelectTrigger className="py-6">
                                  <SelectValue placeholder="Selecione a Categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                  {cursos.map((curso) => {
                                    return (
                                      <SelectItem
                                        key={curso.id}
                                        value={curso.id}
                                      >
                                        <span className="capitalize">
                                          {curso.titulo}
                                        </span>
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>

                              <small className="text-danger">
                                {touched.cursoId &&
                                  errors.cursoId &&
                                  errors.cursoId}
                              </small>
                            </label>
                          </div>
                        )}
                      </TabsBody>
                    </Tabs>
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
                      (photo.loading ||
                        loading ||
                        errors.link ||
                        errors.cursoId ||
                        !photo.file) as boolean
                    }
                  >
                    Actualizar Curso
                  </PrimaryButton>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
