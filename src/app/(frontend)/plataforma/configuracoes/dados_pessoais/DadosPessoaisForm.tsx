"use client";

import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import InputText from "@/app/(frontend)/components/InputText";
import PrimaryButton from "@/app/(frontend)/components/PrimaryButton";
import { api } from "@/app/lib/api/axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarDate, parseAbsoluteToLocal } from "@internationalized/date";
import { DateInput } from "@nextui-org/date-input";
import { Input } from "@nextui-org/input";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import * as yup from "yup";

type DadosPessoaisFormProps = {
  userLogged: IUser;
};

export default function DadosPessoaisForm({
  userLogged,
}: DadosPessoaisFormProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      nome: userLogged.nome,
      sobrenome: userLogged.sobrenome,
      nomeUsuario: userLogged.nomeUsuario,
      genero: userLogged.genero ? userLogged.genero.toLowerCase() : undefined,
      dataNascimento: userLogged.dataNascimento
        ? parseAbsoluteToLocal(
            new Date(userLogged.dataNascimento).toISOString()
          )
        : undefined,
      numeroTelefone: userLogged.numeroTelefone || "",
    },

    validationSchema: yup.object().shape({
      nome: yup.string().required("O nome é obrigatório!"),
      sobrenome: yup.string().required("O nome é obrigatório!"),
      nomeUsuario: yup
        .string()
        .required("O nome de usuário é obrigatório!")
        .matches(
          /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
          "O nome de usuário só pode conter letras, números, . e _"
        ),
      genero: yup.string().oneOf(["masculino", "feminino", "outro"]),
      dataNascimento: yup.string(),
      numeroTelefone: yup
        .string()
        .matches(
          /^9[0-9]{8}$/,
          "O nome de telefone deve começar com 9 e só deve conter 9 números"
        ),
    }),

    onSubmit: (values, { setErrors }) => {
      if (values.dataNascimento) {
        if (
          values.dataNascimento.compare(
            parseAbsoluteToLocal(new Date().toISOString())
          ) >= 0
        ) {
          setErrors({
            ...errors,
            dataNascimento: "Data inválida, selecione uma data passada",
          });
          return;
        }
      }
      console.log("values", values);
      setLoading(true);

      const form = new FormData();

      form.append("nome", values.nome);
      form.append("sobrenome", values.sobrenome);
      form.append("nomeUsuario", values.nomeUsuario);
      form.append("genero", values.genero);

      if (values.dataNascimento) {
        form.append(
          "dataNascimento",
          values.dataNascimento.toDate().toLocaleDateString()
        );
      }

      form.append("numeroTelefone", values.numeroTelefone);

      api
        .put(`/api/users/${userLogged.id}`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast({
            variant: "default",
            title: "Operação bem sucedida!",
            description: "Dados Pessoais actualizados com sucesso!",
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

  const { values, errors, touched, handleSubmit, handleChange, setValues } =
    formik;

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 p-8 border-1 border-black rounded-lg border-opacity-20 mt-6">
        <div className="flex gap-2">
          <InputText
            type="text"
            name="nome"
            onChange={handleChange}
            value={values.nome}
            label="Nome:"
            disabled={true}
          />

          <InputText
            type="text"
            value={values.sobrenome}
            onChange={handleChange}
            name="sobrenome"
            label="Sobrenome:"
          />
        </div>
        <InputText
          type="text"
          name="nomeUsuario"
          onChange={handleChange}
          leftIcon={<>@</>}
          value={values.nomeUsuario}
          label="Nome de usuário:"
        />
        <label className="flex flex-col">
          <p>Género</p>
          <Select
            value={values.genero && values.genero}
            name="genero"
            onValueChange={(value) => {
              setValues({ ...values, genero: value });
            }}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Selecione o seu género" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Selecione o seu género</SelectLabel>
                <SelectItem value="masculino">Masculino</SelectItem>
                <SelectItem value="feminino">Feminino</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </label>
        <small>{touched.genero && errors.genero && errors.genero}</small>
        <div className="flex gap-3 items-center">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <DateInput
              className="max-w-sm"
              labelPlacement="outside"
              hideTimeZone
              onChange={(value) =>
                setValues({
                  ...values,
                  dataNascimento: parseAbsoluteToLocal(
                    value.toDate("utc").toISOString()
                  ),
                })
              }
              label={"Data de Nascimento"}
              name="dataNascimento"
              placeholderValue={new CalendarDate(1995, 11, 6)}
              value={values.dataNascimento}
              color={
                touched.numeroTelefone &&
                errors.numeroTelefone &&
                ("danger" as string)
              }
            />
            <small className="text-danger">
              {touched.dataNascimento &&
                errors.dataNascimento &&
                (errors.dataNascimento as string)}
            </small>
          </div>
          <div className="flex flex-col">
            <Input
              className="appearance-none"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">+244 </span>
                </div>
              }
              name="numeroTelefone"
              onChange={handleChange}
              label="Número de telemóvel:"
              labelPlacement="outside"
              placeholder="942232323"
              min={0}
              type="number"
              color={
                touched.numeroTelefone && errors.numeroTelefone && "danger"
              }
            />
            <small className="text-danger">
              {touched.numeroTelefone &&
                errors.numeroTelefone &&
                errors.numeroTelefone}
            </small>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end mt-4">
        <PrimaryButton type="submit" disabled={loading}>
          Salvar Dados
        </PrimaryButton>
      </div>
    </form>
  );
}
