"use client";

import React, { HTMLAttributes } from "react";
import { apiUrl } from "../../lib/api/axios";

type CursoCoverProps = {
  foto: string;
} & HTMLAttributes<HTMLDivElement>;

export default function CursoCover({ foto, ...props }: CursoCoverProps) {
  return (
    <div
      className={`bg-center bg-cover ${props.className}`}
      style={{
        backgroundImage: `url(${apiUrl}/storage/images/cover_curso/${foto})`,
      }}
    />
  );
}
