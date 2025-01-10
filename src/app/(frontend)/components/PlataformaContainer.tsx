"use client";

import { useTheme } from "next-themes";
import React, { HTMLAttributes } from "react";

type PlataformaContainerProps = {
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function PlataformaContainer({
  children,
  ...props
}: PlataformaContainerProps) {
  const { theme } = useTheme();

  return (
    <div {...props} className={`${theme} text-foreground ${props.className}`}>
      {children}
    </div>
  );
}
