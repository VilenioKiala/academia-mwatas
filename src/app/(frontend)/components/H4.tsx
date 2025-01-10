import { HTMLAttributes } from "react";
import { aquawaxMedium } from "../styles/fonts";

type H4Props = {
  children: React.ReactNode;
} & HTMLAttributes<HTMLHeadElement>;

export default function H4({ children, ...props }: H4Props) {
  return (
    <h1
      className={`${props.className} ${aquawaxMedium.className} text-xl font-bold`}
    >
      {children}
    </h1>
  );
}
