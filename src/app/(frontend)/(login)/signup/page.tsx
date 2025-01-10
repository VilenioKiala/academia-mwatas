"use client";

import { AxiosError } from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import { useFormStatus } from "react-dom";
import { TailSpin } from "react-loading-icons";
import * as yup from "yup";
import InputText from "../../components/InputText";
import InputPassword from "../../components/InputPassword";
import PrimaryButton from "../../components/PrimaryButton";
import HelperButton from "../../components/HelperButton";
import RightArrowIcon from "../../icons/RightArrowIcon";
import H1 from "../../components/H1";
import { createUser } from "@/app/lib/actions/user/createUser";

export default function Page() {
  const { pending } = useFormStatus();

  const formik = useFormik({
    initialValues: {
      nome: "",
      sobrenome: "",
      nome_usuario: "",
      senha: "",
      repetir_senha: "",
    },
    validationSchema: yup.object().shape({
      nome: yup
        .string()
        .required("O nome é obrigatório.")
        .max(30, "O nome não deve ter mais de 30 caracterer"),
      sobrenome: yup
        .string()
        .required("O sobrenome é obrigatório.")
        .max(30, "O nome não deve ter mais de 30 caracterer"),
      nome_usuario: yup
        .string()
        .required("O nome de usuário é obrigatório.")
        .matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/, {
          message: "O nome de usuário só pode conter letras, números, _ ou .",
        }),
      senha: yup
        .string()
        .required("A senha é obrigatória")
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/,
          "A senha deve ter no mínimo uma letra maiúscula, uma letra minúscula e pelo menos 1 número"
        ),
      repetir_senha: yup.string().required("Precisa confirmar a sua senha."),
    }),

    onSubmit: async (values, { setErrors }) => {
      if (values.senha !== values.repetir_senha) {
        return setErrors({ repetir_senha: "As senhas não correspondem!" });
      }

      console.log("submit");

      try {
        const response = await createUser({
          nome: values.nome,
          sobrenome: values.sobrenome,
          nomeUsuario: values.nome_usuario,
          senha: values.senha,
          repetirSenha: values.repetir_senha,
        });

        return { ...response.data };
      } catch (error) {
        if (error instanceof AxiosError) {
          const response = { validationerror: error.response.data };

          console.log(response);

          return response;
        }
      }
    },
  });

  const { values, handleChange, touched, errors, handleSubmit } = formik;

  return (
    <>
      <div>
        <H1 className="text-center mb-6 mt-2">Crie a sua conta</H1>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="flex">
            <div className="flex-1">
              <InputText
                type="text"
                label="Nome:"
                className={`w-full"}`}
                name="nome"
                placeholder="Digite o seu nome"
                value={values.nome}
                onChange={handleChange}
                error={touched.nome && errors.nome && errors.nome}
              />
            </div>
            <div className="flex-1 ml-4">
              <InputText
                type="text"
                label="Sobrenome:"
                className="w-full"
                name="sobrenome"
                placeholder="Digite o seu sobrenome"
                value={values.sobrenome}
                onChange={handleChange}
                error={
                  touched.sobrenome && errors.sobrenome && errors.sobrenome
                }
              />
            </div>
          </div>

          <div className="my-2">
            <InputText
              type="text"
              label="Nome de Usuário:"
              className="w-full"
              name="nome_usuario"
              leftIcon={<p>@</p>}
              placeholder="Digite o seu nome de usuário"
              value={values.nome_usuario}
              onChange={handleChange}
              error={
                touched.nome_usuario &&
                errors.nome_usuario &&
                errors.nome_usuario
              }
            />
          </div>

          <div className="my-2">
            <InputPassword
              error={touched.senha && errors.senha && errors.senha}
              label="Senha"
              className="w-full"
              placeholder="Digite aqui a sua senha"
              name="senha"
              value={values.senha}
              onChange={handleChange}
            />
          </div>

          <div className="my-2">
            <InputPassword
              error={
                touched.repetir_senha &&
                errors.repetir_senha &&
                errors.repetir_senha
              }
              label="Confirme a sua senha"
              className="w-full"
              placeholder="Repita a sua senha"
              name="repetir_senha"
              value={values.repetir_senha}
              onChange={handleChange}
            />
          </div>

          <PrimaryButton className="w-full" type="submit" disabled={pending}>
            {pending ? <TailSpin width={40} height={20} /> : "Criar Conta"}
          </PrimaryButton>

          <Link href="/signin">
            <HelperButton
              className="flex items-center w-full mt-4 pl-6 pr-2 py-4"
              disabled={pending}
            >
              <div className="flex-[0.9] flex flex-col items-start">
                <p>Já possui uma conta?</p>
                <p className="font-semibold text-myblue">Entre na sua conta</p>
              </div>

              <div className="flex-[0.1] flex items-center justify-center">
                <RightArrowIcon />
              </div>
            </HelperButton>
          </Link>
        </form>
      </div>
    </>
  );
}
