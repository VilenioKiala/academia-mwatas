"use client";

import InputText from "@/app/(frontend)/components/InputText";
import PrimaryButton from "@/app/(frontend)/components/PrimaryButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@nextui-org/button";
import { FormikValues, useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as yup from "yup";
import SuccessMessage from "../../components/SuccessMessage";
import { TailSpin } from "react-loading-icons";
import { createCategoria } from "@/app/lib/actions/categoria/createCategoria";

type AddCategoriaModalProps = {
  children: React.ReactNode;
};

export default function AddCategoriaModal({
  children,
}: AddCategoriaModalProps) {
  // App States
  const router = useRouter();
  const [successMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  // Formik hooks
  const formik = useFormik({
    initialValues: {
      nome_categoria: "",
    },
    validationSchema: yup.object().shape({
      nome_categoria: yup
        .string()
        .required("O nome da categoria é obrigatório"),
    }),
    onSubmit: async (values: FormikValues) => {
      setLoading(true);

      createCategoria(values.nome_categoria)
        .then(() => {
          toast({
            variant: "default",
            title: "Operação bem sucedida!",
            description: "Categoria criada com sucesso!",
            className: "bg-green-500 text-white border-1 border-green-800",
          });
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
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent onInteractOutside={undefined} className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-semibold text-2xl">
              Adicionar Categoria
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
                      touched.nome_categoria &&
                      errors.nome_categoria &&
                      "border-danger"
                    }`}
                    type="text"
                    name="nome_categoria"
                    value={values.nome_categoria}
                    onChange={handleChange}
                    // errors={errors && errors}
                  />
                  <small className="text-danger">
                    <>
                      {touched.nome_categoria &&
                        errors.nome_categoria &&
                        (errors.nome_categoria as string)}
                    </>
                  </small>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="light"
                    color="danger"
                    onPress={() => router.back()}
                    type="button"
                  >
                    <span>Cancelar</span>
                  </Button>
                  <PrimaryButton
                    type="submit"
                    disabled={(loading || errors.nome_categoria) as boolean}
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
