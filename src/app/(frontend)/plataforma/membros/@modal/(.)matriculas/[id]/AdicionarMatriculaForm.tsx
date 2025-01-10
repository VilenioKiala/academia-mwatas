"use client";

import { ICourse } from "@/app/(backend)/interfaces/objects/ICourse";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import PrimaryButton from "@/app/(frontend)/components/PrimaryButton";
import { api } from "@/app/lib/api/axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@nextui-org/button";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import * as yup from "yup";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { DateInput } from "@nextui-org/date-input";

export default function AdicionarMatriculaForm({
  user,
  cursos,
}: {
  user: IUser;
  cursos: ICourse[];
}) {
  const router = useRouter();

  const { toast } = useToast();

  const [loading, setLoading] = React.useState(false);

  // Formik hooks and functions
  const formik = useFormik({
    initialValues: {
      cursoId: "",
      dataExpiracao: parseAbsoluteToLocal(new Date().toISOString()),
    },

    validationSchema: yup.object().shape({
      cursoId: yup.string().required("O curso é obrigatório!"),
      dataExpiracao: yup.string().required("A data de Expiração é obrigatória"),
    }),

    onSubmit: (values, { setErrors }) => {
      if (
        values.dataExpiracao.compare(
          parseAbsoluteToLocal(new Date().toISOString())
        ) <= 0
      ) {
        setErrors({
          ...errors,
          dataExpiracao: "Data inválida, selecione uma data futura",
        });
        return;
      }
      setLoading(true);

      const { cursoId, dataExpiracao } = values;

      api
        .post("/api/matriculas", {
          usuarioId: user.id,
          cursoId,
          dataExpiracao: dataExpiracao.toDate(),
        })
        .then((matriculaCreated) => {
          console.log(matriculaCreated);

          toast({
            variant: "default",
            title: "Operação bem sucedida!",
            description: "Matrícula criada com sucesso!",
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

  const { handleSubmit, setValues, values, errors, touched, setErrors } =
    formik;

  console.log(values);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="flex flex-col gap-3"
      >
        <div className="w-full max-w-xl flex flex-col">
          <DateInput
            granularity="second"
            label="Data de Expiração:"
            onChange={(value) =>
              setValues({
                ...values,
                dataExpiracao: parseAbsoluteToLocal(
                  value.toDate().toISOString()
                ),
              })
            }
            labelPlacement="outside"
            value={values.dataExpiracao}
            className="text-2xl"
            onBlur={() => setErrors({ ...errors })}
          />
          <small className="text-red-500">
            <p>{touched.dataExpiracao && (errors.dataExpiracao as string)}</p>
          </small>
        </div>
        <label className="flex flex-col gap-1">
          <p>Curso:</p>
          <Select
            onValueChange={(value) => {
              setValues({ ...values, cursoId: value });
            }}
          >
            <SelectTrigger className="py-6">
              <SelectValue placeholder="Selecione o Curso" />
            </SelectTrigger>
            <SelectContent>
              {cursos.map((curso) => {
                return (
                  <SelectItem key={curso.id} value={curso.id}>
                    <span className="font-semibold">{curso.titulo}</span> -{" "}
                    {curso.preco} AOA
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <small className="text-red-500">
            {touched.cursoId && errors.cursoId}
          </small>
        </label>

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
            Adicionar Matrícula
          </PrimaryButton>
        </div>
      </form>
    </>
  );
}
