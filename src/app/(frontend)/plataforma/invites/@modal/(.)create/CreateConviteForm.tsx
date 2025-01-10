"use client";

import PrimaryButton from "@/app/(frontend)/components/PrimaryButton";
import Textarea from "@/app/(frontend)/components/Textarea";
import { api } from "@/app/lib/api/axios";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@nextui-org/button";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import Dropzone from "react-dropzone";
import * as yup from "yup";

export default function CreateConviteForm() {
  const router = useRouter();

  const { toast } = useToast();

  const [imagem, setImagem] = React.useState({
    loading: false,
    progress: 0,
    totalBytes: 0,
    file: undefined,
    error: "",
  });

  const [loading, setLoading] = React.useState(false);

  // Formik hooks and functions
  const formik = useFormik({
    initialValues: {
      textoDestaque: "",
      textoChamada: "",
    },

    validationSchema: yup.object().shape({
      textoDestaque: yup
        .string()
        .required("O Texto em destaque é obrigatório!")
        .min(1, "O Texto em destaque deve ter no mínimo 1 caracteres")
        .max(500, "O Texto em destaque não pode ter mais de 500 caracteres"),

      textoChamada: yup
        .string()
        .required("O Texto de chamada é obrigatório!")
        .min(1, "O Texto de chamada deve ter no mínimo 1 caracteres")
        .max(500, "O Texto de chamada não pode ter mais de 500 caracteres"),
    }),

    onSubmit: (values) => {
      setLoading(true);

      const form = new FormData();

      form.append("imagem", imagem.file);
      form.append("textoDestaque", values.textoDestaque);
      form.append("textoChamada", values.textoChamada);

      api
        .post("/api/convites", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((conviteCreated) => {
          console.log(conviteCreated);

          toast({
            variant: "default",
            title: "Operação bem sucedida!",
            description: "Convite criado com sucesso!",
            className: "bg-green-500 text-white border-1 border-green-800",
          });

          router.back();

          router.refresh();
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const { handleSubmit, values, handleChange, errors, touched } = formik;

  console.log(values);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="flex justify-center flex-col gap-3 mt-8 h-full"
      >
        <div className="h-full grid grid-cols-2 flex-1 gap-6 items-center">
          <Dropzone
            onDrop={(acceptedFiles) => {
              const acceptedMimetypes = ["image/jpeg", "image/png"];

              if (!acceptedMimetypes.includes(acceptedFiles[0].type)) {
                return setImagem({
                  ...imagem,
                  error: "O ficheiro deve ser uma foto, do tipo jpg ou png",
                });
              }
              const reader = new FileReader();

              reader.onloadstart = (e: ProgressEvent<FileReader>) => {
                console.log(e.total);
                setImagem({
                  ...imagem,
                  progress: 0,
                  loading: true,
                  totalBytes: e.total,
                  error: "",
                });
              };

              reader.onprogress = (e: ProgressEvent<FileReader>) => {
                console.log(e.loaded);
                setImagem({
                  ...imagem,
                  totalBytes: e.total,
                  loading: true,
                  progress: e.loaded,
                });
              };

              reader.onloadend = () => {
                setImagem({
                  ...imagem,
                  loading: false,
                  file: acceptedFiles[0],
                });
              };

              reader.readAsArrayBuffer(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section
                className={`flex-1 h-full border-1 flex items-center justify-center ${
                  imagem.error && "border-danger"
                }`}
              >
                <div
                  {...getRootProps({
                    className: `dropzone h-full flex items-center justify-center bg-cover bg-center ${
                      imagem.error && "border-danger"
                    }`,
                    style: {
                      backgroundImage:
                        imagem.file &&
                        `url(${URL.createObjectURL(imagem.file)})`,
                    },
                  })}
                >
                  <input {...getInputProps()} />
                  <p className="text-center">
                    Solte aqui ou clique para seleccionar da Página de Captura
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
          <div className="flex flex-col gap-4">
            <div className="flex-1">
              <Textarea
                label="Texto de Destaque:"
                className="w-full"
                name="textoDestaque"
                placeholder="Digite o texto principal da página de captura:"
                value={values.textoDestaque}
                onChange={handleChange}
                error={touched.textoDestaque && errors.textoDestaque}
              />
            </div>
            <div className="flex-1">
              <Textarea
                label="Texto de Chamada:"
                className="w-full"
                name="textoChamada"
                placeholder="Digite o texto que descreve melhor o Convite"
                value={values.textoChamada}
                onChange={handleChange}
                error={touched.textoChamada && errors.textoChamada}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 justify-end">
          <Button
            onClick={() => router.back()}
            variant="light"
            color="danger"
            type="button"
          >
            Cancelar
          </Button>
          <PrimaryButton type="submit" disabled={loading}>
            Criar Convite
          </PrimaryButton>
        </div>
      </form>
    </>
  );
}
