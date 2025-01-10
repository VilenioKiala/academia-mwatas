import Link from "next/link";
import React, { AnchorHTMLAttributes } from "react";

type AppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export default function AppLink({ ...props }: AppLinkProps) {
  return (
    <Link
      {...props}
      className={`hover:text-myblue transition-all ${props.className}`}
    >
      {props.children}
    </Link>
  );
}
