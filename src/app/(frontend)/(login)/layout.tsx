"use client";

import React from "react";
import pattern from "../images/pattern.png";
import logo from "../images/mwataslogo.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { data: session } = useSession();

  if (session) {
    router.replace("/plataforma/conteudos");
  }

  return (
    <div className="grid grid-cols-8">
      <div className="fixed hidden top-0 left-0 w-full h-screen lg:grid grid-cols-8 z-0">
        <div
          className="w-full h-full col-start-5 col-span-full"
          style={{
            backgroundImage: `url(${pattern.src})`,
          }}
        ></div>
      </div>

      <div className="col-start-1 col-span-full lg:col-span-4 relative z-10 flex flex-col items-center justify-center lg:justify-start">
        <div className="w-2/3 mt-10">
          <Image
            src={logo.src}
            width={150}
            height={150}
            alt="Logotipo Mwata's Academy"
            className="block m-auto"
          />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
