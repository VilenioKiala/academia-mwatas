import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const aquawaxLight = localFont({
  src: "./fonts/AquawaxLight.ttf",
  variable: "--font-aquawax-light",
  weight: "100 900",
});

const aquawaxMedium = localFont({
  src: "./fonts/AquawaxMedium.ttf",
  variable: "--font-aquawax-medium",
  weight: "100 900",
});

const aquawaxBlack = localFont({
  src: "./fonts/AquawaxBlack.ttf",
  variable: "--font-aquawax-black",
  weight: "100 900",
});

export { montserrat, aquawaxLight, aquawaxMedium, aquawaxBlack };
