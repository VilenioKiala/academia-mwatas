"use client";

import Image from "next/image";
import TailSpin from "react-loading-icons/dist/esm/components/tail-spin";
import mwataslogo from "../images/mwataslogo.png";
import mwatasLogoWhite from "../images/mwataslogocenterwhite.png";
import { useTheme } from "next-themes";

type LoginScreenProps = {
  loading: boolean;
};

export default function LoginScreen({ loading }: LoginScreenProps) {
  const { theme } = useTheme();

  return (
    loading && (
      <div className="w-full h-screen fixed top-0 left-0 bg-white dark:bg-gray-900 bg-opacity-85 z-[200] flex flex-col items-center justify-center">
        {theme == "light" ? (
          <>
            <Image
              src={mwataslogo.src}
              width={mwataslogo.width}
              height={mwataslogo.height}
              alt="Mwata's Logo"
            />
            <TailSpin
              className="mt-6"
              stroke="#4C78CA"
              width={50}
              height={50}
            />
          </>
        ) : (
          <>
            <Image
              src={mwatasLogoWhite.src}
              width={mwatasLogoWhite.width}
              height={mwatasLogoWhite.height}
              alt="Mwata's Logo White"
            />
            <TailSpin
              className="mt-6"
              stroke="#ffffff"
              width={50}
              height={50}
            />
          </>
        )}
      </div>
    )
  );
}
