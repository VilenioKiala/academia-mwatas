"use client";

import Link from "next/link";
import React from "react";
import HelperButton from "../../components/HelperButton";
import RightArrowIcon from "../../icons/RightArrowIcon";
import H1 from "../../components/H1";
import SigninForm from "./SigninForm";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();

  console.log(session);

  return (
    <>
      <div>
        <H1 className="text-center mt-1 mb-3">Acesse a sua conta</H1>
        <SigninForm />
        <Link href="/signup">
          <HelperButton className="flex items-center w-full mt-4 pl-6 pr-2 py-4">
            <div className="flex-[0.9] flex flex-col items-start">
              <p>Não possui uma conta?</p>
              <p className="font-semibold text-myblue">Crie uma conta agora!</p>
            </div>

            <div className="flex-[0.1] flex items-center justify-center">
              <RightArrowIcon />
            </div>
          </HelperButton>
        </Link>
      </div>
    </>
  );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getServerSession(context.req, context.res, authOptions)

//   // If the user is already logged in, redirect.
//   // Note: Make sure not to redirect to the same page
//   // To avoid an infinite loop!
//   if (session) {
//     return { redirect: { destination: "/" } }
//   }

//   const providers = await getProviders()

//   return {
//     props: { providers: providers ?? [] },
//   }
// }
