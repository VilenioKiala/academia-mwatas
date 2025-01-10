"use server";

import { ValidationError } from "@/app/(backend)/helpers/errors/ValidationError";
import { signIn } from "@/app/auth";
import { AuthError } from "next-auth";

async function SigninAction(
  prevState: { error: string; email: string; senha: string },
  formData: FormData
) {
  const rawFormData = {
    email: formData.get("email"),
    senha: formData.get("senha"),
    redirectTo: "/plataforma/conteudos",
  };

  try {
    await signIn("credentials", rawFormData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Senha ou Email Errado!",
            email: formData.get("email"),
            senha: formData.get("senha"),
          };
        default:
          return {
            error: "Erro desconhecido",
            email: formData.get("email"),
            senha: formData.get("senha"),
          };
      }
    }

    if (error instanceof ValidationError) {
      return {
        error: error.message,
        email: formData.get("email"),
        senha: formData.get("senha"),
      };
    }

    throw error;
  }
}

export { SigninAction };
