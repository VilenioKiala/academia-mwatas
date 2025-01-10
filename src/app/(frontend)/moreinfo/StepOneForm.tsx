"use client";

import React, { Dispatch, SetStateAction } from "react";
import InputText from "../components/InputText";
import { useFormik } from "formik";
import * as yup from "yup";
import { CalendarDate, parseAbsoluteToLocal } from "@internationalized/date";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import PrimaryButton from "../components/PrimaryButton";
import { Input } from "@nextui-org/input";
import { DateInput } from "@nextui-org/date-input";
import { updateUser } from "@/app/lib/actions/user/updateUser";
import { Button } from "@material-tailwind/react";
import H3 from "../components/H3";

type StepOneFormProps = {
  userLogged: IUser;
  setActualStep: Dispatch<SetStateAction<number>>;
  actualStep: number;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

export default function StepOneForm({
  loading,
  userLogged,
  setLoading,
  actualStep,
  setActualStep,
}: StepOneFormProps) {
  const formik = useFormik({
    initialValues: {
      genero: undefined,

      dataNascimento: undefined,
      numeroTelefone: "",
    },

    validationSchema: yup.object().shape({
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

      console.log("submitou");

      setLoading(true);

      updateUser({
        idUser: userLogged.id,
        genero: values.genero,
        dataNascimento: values.dataNascimento && values.dataNascimento.toDate(),
        numeroTelefone: values.numeroTelefone,
      })
        .then(() => {
          setActualStep(actualStep + 1);
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

  React.useEffect(() => {
    console.log("renderizou");

    setValues({
      genero:
        userLogged.genero || userLogged.genero.length > 0
          ? userLogged.genero.toLowerCase()
          : undefined,
      dataNascimento: userLogged.dataNascimento
        ? parseAbsoluteToLocal(
            new Date(userLogged.dataNascimento).toISOString()
          )
        : undefined,
      numeroTelefone: userLogged.numeroTelefone || "",
    });
  }, [
    setValues,
    userLogged.dataNascimento,
    userLogged.genero,
    userLogged.numeroTelefone,
  ]);

  return (
    <>
      <H3 className="mt-8 font-semibold">
        Forneça mais informações sobre você (Opcional)
      </H3>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="w-full flex-1 flex flex-col"
      >
        <div className="flex-1 flex flex-col gap-6 mt-6 w-full">
          <div className="w-full flex gap-2">
            <InputText
              className="flex-1"
              type="text"
              name="nome"
              onChange={handleChange}
              value={userLogged.nome}
              label="Nome:"
              disabled={true}
            />

            <InputText
              className="flex-1"
              type="text"
              value={userLogged.sobrenome}
              onChange={handleChange}
              name="sobrenome"
              label="Sobrenome:"
              disabled={true}
            />
          </div>
          <InputText
            type="text"
            name="nomeUsuario"
            onChange={handleChange}
            leftIcon={<>@</>}
            value={userLogged.nomeUsuario}
            label="Nome de usuário:"
            disabled={true}
          />
          <label className="flex flex-col">
            <p>Género</p>
            <Select
              disabled={loading}
              value={values.genero && values.genero}
              name="genero"
              onValueChange={(value) => {
                setValues({ ...values, genero: value });
              }}
            >
              <SelectTrigger>
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
          <div className="w-full flex gap-3 items-center">
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 flex-1">
              <DateInput
                disabled={loading}
                className="max-w-sm flex-1"
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
            <div className="flex-1 flex flex-col">
              <Input
                disabled={loading}
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
                  touched.numeroTelefone &&
                  errors.numeroTelefone &&
                  ("danger" as string)
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
        <div className="py-6 flex justify-between items-center">
          <Button
            disabled={loading}
            variant="text"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={() => setActualStep(actualStep + 1)}
          >
            Ignorar
          </Button>
          <PrimaryButton type="submit" disabled={loading}>
            Próximo passo
          </PrimaryButton>
        </div>
      </form>
    </>
  );
}
