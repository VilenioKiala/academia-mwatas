"use client";

import React, { HTMLAttributes } from "react";
import noProfilePic from "@/app/(frontend)/images/noprofile.jpg";
import { apiUrl } from "../../lib/api/axios";

type AvatarProps = {
  foto?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function Avatar({ foto, ...props }: AvatarProps) {
  return (
    <div
      className={`w-[3.3rem] h-[3.3rem] border-1 border-myblue bg-center bg-cover rounded-full ${props.className}`}
      style={{
        backgroundImage: foto
          ? `url(${apiUrl}/storage/images/profile_pic/${foto})`
          : `url(${noProfilePic.src})`,
      }}
    />
  );
}
