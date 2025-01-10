import React, { HTMLAttributes } from "react";

type SeparatorProps = HTMLAttributes<HTMLDivElement>;
export default function Separator({ ...props }: SeparatorProps) {
  return (
    <div
      {...props}
      className={`h-[0.05rem] bg-black dark:bg-white opacity-30 ${props.className}`}
    />
  );
}
