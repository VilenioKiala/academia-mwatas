import { HTMLAttributes } from "react";
import { montserrat } from "../styles/fonts";

type H1Props = {
  children: React.ReactNode;
} & HTMLAttributes<HTMLHeadElement>;

export default function H1({ children, ...props }: H1Props) {
  return (
    <h1
      className={`${props.className} ${montserrat.className} text-3xl font-bold`}
    >
      {children}
    </h1>
  );
}
