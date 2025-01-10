"use client";

import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import Image from "next/image";
import React from "react";
import logo from "@/app/(frontend)/images/mwataslogo.png";
import { Progress } from "@nextui-org/progress";
import StepOneForm from "./StepOneForm";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import StepTwoForm from "./StepTwoForm";
import StepThreeForm from "./StepThreeForm";

type MoreInfoCardProps = {
  userLogged: IUser;
};

export default function MoreInfoCard({ userLogged }: MoreInfoCardProps) {
  const [actualStep, setActualSteps] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="w-screen flex items-center justify-center">
      <div className="w-full md:px-4 md:w-4/5 xl:w-1/2 h-screen py-2 flex flex-col items-center justify-center gap-3">
        <div className="logo flex-[0.1]">
          <Image
            src={logo.src}
            width={logo.width}
            height={logo.height}
            alt="Logotipo Mwata's Academy"
            className="block m-auto w-24"
          />
        </div>
        <div className="flex-[0.8] w-full border-black border-1 border-opacity-20 drop-shadow-xl rounded-xl px-12 py-12 flex flex-col overflow-y-auto">
          {actualStep > 1 && (
            <button
              className="flex items-center cursor-pointer mb-8"
              onClick={() => setActualSteps(actualStep - 1)}
            >
              <ArrowLeftIcon className="w-6 h-6" />
              <p className="ml-4">Voltar</p>
            </button>
          )}
          <div className="flex-1">
            <Progress
              className="mt-4"
              classNames={{
                base: "w-full",
                track: "drop-shadow-md border border-default mt-1",
                indicator: "bg-myblue",
                label: "tracking-wider font-medium",
                value: "text-foreground/60",
              }}
              maxValue={3}
              radius="sm"
              showValueLabel={true}
              size="sm"
              value={actualStep - 1}
            />
            <div className="flex flex-col">
              {actualStep == 1 && (
                <StepOneForm
                  userLogged={userLogged}
                  setActualStep={setActualSteps}
                  actualStep={actualStep}
                  loading={loading}
                  setLoading={setLoading}
                />
              )}

              {actualStep == 2 && (
                <StepTwoForm
                  userLogged={userLogged}
                  setActualStep={setActualSteps}
                  actualStep={actualStep}
                  loading={loading}
                  setLoading={setLoading}
                />
              )}

              {actualStep == 3 && (
                <StepThreeForm
                  userLogged={userLogged}
                  loading={loading}
                  setLoading={setLoading}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
