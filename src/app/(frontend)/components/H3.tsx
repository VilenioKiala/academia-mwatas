import { HTMLAttributes } from "react";
import { montserrat } from "../styles/fonts";

type H3Props = {
  children: React.ReactNode;
} & HTMLAttributes<HTMLHeadElement>;

export default function H3({ children, ...props }: H3Props) {
  return (
    <h1
      className={` ${montserrat.className} text-2xl font-bold ${props.className}`}
    >
      {children}
    </h1>
  );
}
