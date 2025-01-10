"use client";

import { Button } from "@nextui-org/button";
import { FormikValues, useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { TailSpin } from "react-loading-icons";
import * as yup from "yup";
import { api } from "@/app/lib/api/axios";
import { useToast } from "@/hooks/use-toast";
import PrimaryButton from "@/app/(frontend)/components/PrimaryButton";
import InputText from "@/app/(frontend)/components/InputText";
import SuccessMessage from "@/app/(frontend)/components/SuccessMessage";
import H1 from "@/app/(frontend)/components/H1";

export default function CreateCategoriaForm() {
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

      api
        .post("/api/categorias", {
          nome: values.nome_categoria,
        })
        .then((categoriaCreated) => {
          console.log(categoriaCreated);

          toast({
            variant: "default",
            title: "Operação bem sucedida!",
            description: "Categoria criada com sucesso!",
            className: "bg-green-500 text-white border-1 border-green-800",
          });

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

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div>
      <H1>Criar Categoria</H1>
      <form method="post" onSubmit={handleSubmit}>
        <div className="my-6">
          {successMessage && (
            <SuccessMessage className="mx-5">{successMessage}</SuccessMessage>
          )}
          <InputText
            label="Nome"
            placeholder="Digite aqui o nome da categoria"
            className={`${
              touched.nome_categoria && errors.nome_categoria && "border-danger"
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
                errors.nome_categoria}
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
    </div>
  );
}
