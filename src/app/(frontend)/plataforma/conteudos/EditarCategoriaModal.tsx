"use client";

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
import { useToast } from "@/hooks/use-toast";
// import { Button } from "@nextui-org/button";
import { FormikValues, useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as yup from "yup";
import SuccessMessage from "../../components/SuccessMessage";
import { TailSpin } from "react-loading-icons";
import { ICategory } from "@/app/(backend)/interfaces/objects/ICategory";

type EditarCategoriaModalProps = {
  categoria: ICategory;
  children: React.ReactNode;
};

export default function EditarCategoriaModal({
  categoria,
  children,
}: EditarCategoriaModalProps) {
  // App States
  const router = useRouter();
  const [successMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  // Formik hooks
  const formik = useFormik({
    initialValues: {
      titulo: categoria.nome,
    },
    validationSchema: yup.object().shape({
      titulo: yup.string().required("O nome da categoria é obrigatório"),
    }),
    onSubmit: async (values: FormikValues) => {
      console.log("clicked");
      setLoading(true);

      api
        .put(`/api/categorias/${categoria.id}`, {
          nome: values.titulo,
        })
        .then((categoriaEdited) => {
          console.log(categoriaEdited);

          toast({
            variant: "default",
            title: "Operação bem sucedida!",
            description: "Categoria actualizada com sucesso!",
            className: "bg-green-500 text-white border-1 border-green-800",
          });

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

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div>
      {" "}
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-semibold text-2xl">
              Editar Categoria
            </DialogTitle>
            <DialogDescription>
              <form method="post" onSubmit={handleSubmit}>
                <div className="my-6">
                  {successMessage && (
                    <SuccessMessage className="mx-5">
                      {successMessage}
                    </SuccessMessage>
                  )}
                  <InputText
                    label="Nome"
                    placeholder="Digite aqui o nome da categoria"
                    className={`${
                      touched.titulo && errors.titulo && "border-danger"
                    }`}
                    type="text"
                    name="titulo"
                    value={values.titulo}
                    onChange={handleChange}
                    // errors={errors && errors}
                  />
                  <small className="text-danger">
                    <>
                      {touched.titulo &&
                        errors.titulo &&
                        (errors.titulo as string)}
                    </>
                  </small>
                </div>
                <div className="flex justify-end">
                  {/* <Button
                    variant="light"
                    color="danger"
                    onPress={() => router.back()}
                    type="button"
                  >
                    <span>Cancelar</span>
                  </Button> */}
                  <PrimaryButton
                    type="submit"
                    disabled={(loading || errors.titulo) as boolean}
                  >
                    {!loading ? (
                      "Adicionar Categoria"
                    ) : (
                      <TailSpin width={30} height={30} />
                    )}
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
