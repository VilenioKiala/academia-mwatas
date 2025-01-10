"use server";

import { AxiosError } from "axios";
import * as yup from "yup";
import { redirect, RedirectType } from "next/navigation";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { SigninAction } from "@/app/lib/actions/auth/SigninAction";
import { createSession } from "@/app/lib/session";

export type signinState =
  | {
      error: { message: string; logged: boolean };
    }
  | { user: IUser; logged: boolean; message: string }
  | undefined
  | unknown;

async function signIn(state: signinState, formData: FormData) {
  "use server";

  const email = formData.get("email").toString();
  const senha = formData.get("password").toString();

  const validationSchema = yup.object({
    senha: yup.string().required(),
    email: yup.string().required(),
  });

  return validationSchema
    .validate({ email, senha })
    .then(async () => {
      try {
        const response = await SigninAction(email || "", senha || "");

        console.log(response.user);

        await createSession(response.user.id);

        console.log("criou a sessão");

        redirect("/plataforma/conteudos/", RedirectType.push);

        return { ...response.data };
      } catch (error) {
        if (error instanceof AxiosError) {
          const response = {
            error: { ...error.response.data.error },
            logged: false,
          };

          return response;
        }

        return error;
      }
    })
    .catch((error: yup.ValidationError) => {
      return {
        error: {
          field: error.name,
          message: error.message,
          values: {
            email,
            senha,
          },
        },
      };
    });
}

export { signIn };
