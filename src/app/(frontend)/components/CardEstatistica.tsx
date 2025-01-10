"use client";

import React from "react";
import patternLittle from "@/app/(frontend)/images/pattern-little.png";
import patternLittleDark from "@/app/(frontend)/images/pattern-littledark.png";
import H3 from "./H3";
import { useTheme } from "next-themes";

type CardEstatisticaProps = {
  titulo: string;
  num: number;
};

export default function CardEstatistica({ titulo, num }: CardEstatisticaProps) {
  const { theme } = useTheme();

  return (
    <div className="flex border-1 border-black border-opacity-25 rounded-3xl overflow-hidden dark:bg-gray-900 text-foreground">
      <div className="flex-1 flex-col py-6 pl-6 gap-6">
        <div className="flex items-center gap-3 mb-5">
          <H3 className="text-lg font-medium">{titulo}</H3>
        </div>

        <div className="flex flex-col">
          <H3 className="font-light text-6xl">{num}</H3>
          <div className="w-10 h-[0.15rem] bg-myblue dark:bg-white bg-cover bg-center rounded-r-xl"></div>
        </div>
      </div>
      <div
        className="w-20 h-full bg-cover bg-center"
        style={{
          backgroundImage:
            theme == "dark"
              ? `url(${patternLittleDark.src})`
              : `url(${patternLittle.src})`,
        }}
      ></div>
    </div>
  );
}
