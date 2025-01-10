import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../prisma/prisma";
import { loginService } from "./(backend)/services/auth/Login";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      userId?: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: {
        label: "Email",
        type: "email",
        placeholder: "email@example.com",
      },
      nomeUsuario: {
        label: "nomeUsuario",
        type: "nomeUsuario",
        placeholder: "Digite o nome de usuário:",
      },
      senha: { label: "Senha", type: "password" },
    },
    authorize: async (c) => {
      console.log("authorize");

      const loginResponse = await loginService.execute({
        emailOrNomeUsuario: (c.email || c.nomeUsuario) as string,
        senha: c.senha as string,
      });

      return loginResponse.user;
    },
  }),
  GitHub,
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
});
