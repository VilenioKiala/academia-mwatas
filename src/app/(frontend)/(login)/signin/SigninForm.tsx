"use client";

import React, { useActionState } from "react";
import InputText from "../../components/InputText";
import PrimaryButton from "../../components/PrimaryButton";
import ShowPasswordIcon from "../../icons/ShowPasswordIcon";
import HidePasswordIcon from "../../icons/HidePasswordIcon";
import ErrorMessage from "../../components/ErrorMessage";
import { SigninAction } from "@/app/lib/actions/auth/SigninAction";

export default function SigninForm() {
  // const [loading, setLoading] = React.useState(false);
  // const router = useRouter();

  const [state, formAction] = useActionState(SigninAction, {
    error: "",
    email: "",
    senha: "",
  });

  // // Formik hooks
  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     senha: "",
  //   },
  //   validationSchema: yup.object().shape({
  //     email: yup.string().required("O email é obrigatório"),
  //     senha: yup.string().required("A Senha é obrigatório"),
  //   }),
  //   onSubmit: async (values: FormikValues) => {
  //     console.log("submitou");
  //     setLoading(true);

  //     await signIn("credentials", { email: values.email, senha: values.senha });

  //     toast({
  //       variant: "default",
  //       title: "Operação bem sucedida!",
  //       description: "Login Efectuado com sucesso",
  //       className: "bg-green-500 text-white border-1 border-green-800",
  //     });

  //     router.push("/plataforma/conteudos/");
  //   },
  // });

  // const { handleSubmit, errors, values, handleChange } = formik;

  // const { toast } = useToast();
  const [showPassword, setShowPassword] = React.useState(false);

  // // async function signinAction(state: unknown, formData: FormData) {
  // //     const email = formData.get("email").toString();
  // //     const senha = formData.get("password").toString();

  // //     const validationSchema = yup.object({
  // //       senha: yup.string().required(),
  // //       email: yup.string().required(),
  // //     });

  // //     return validationSchema
  // //     .validate({ email, senha })
  // //     .then(async () => {
  // //         try {
  // //             const response = await signIn("credentials", {email, senha})

  // //             toast({
  // //                 variant: "default",
  // //                 title: "Operação bem sucedida!",
  // //                 description: "Login Efectuado com sucesso",
  // //                 className: "bg-green-500 text-white border-1 border-green-800",
  // //             });

  // //             router.push("/plataforma/conteudos/");

  // //             return { ...response };
  // //         } catch (error) {
  // //         if (error instanceof AxiosError) {
  // //             const response = {
  // //             error: { ...error.response.data.error },
  // //             logged: false,
  // //             };

  // //             return response;
  // //         }

  // //         return error;
  // //         }
  // //     })
  // //     .catch((error: yup.ValidationError) => {
  // //         return {
  // //         error: {
  // //             field: error.name,
  // //             message: error.message,
  // //             values: {
  // //             email,
  // //             senha,
  // //             },
  // //         },
  // //         };
  // //     });
  // // }

  function handleShowHidePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <>
      {state?.error && (
        <ErrorMessage>
          <p>{state?.error as string}</p>{" "}
        </ErrorMessage>
      )}
      <form method="POST" action={formAction}>
        <div className="my-2">
          <InputText
            type="text"
            defaultValue={state?.email && (state?.email as string)}
            label="Email"
            className="w-full"
            placeholder="Digite aqui o seu email"
            name="email"
            id="email"
          />
        </div>

        <div className="my-2">
          <InputText
            type={showPassword ? "text" : "password"}
            id="senha"
            defaultValue={state?.senha && (state?.senha as string)}
            rightIcon={
              <button onClick={handleShowHidePassword} type="button">
                {showPassword ? (
                  <button
                    type="button"
                    onChange={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    <HidePasswordIcon width="30" height="30" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onChange={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    <ShowPasswordIcon width="30" height="30" />
                  </button>
                )}
              </button>
            }
            label="Senha"
            className="w-full"
            placeholder="Digite aqui a sua senha"
            name="senha"
          />
        </div>
        <PrimaryButton
          className="w-full flex items-center justify-center"
          // loading={loading}
          type="submit"
        >
          Entrar
        </PrimaryButton>
      </form>
    </>
  );
}
