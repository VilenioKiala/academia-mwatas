import React, { HTMLAttributes } from "react";

type SuccessMessageProps = {
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function SuccessMessage({
  children,
  ...props
}: SuccessMessageProps) {
  return (
    <div
      {...props}
      className={`px-5 py-5 bg-green-600 border border-green-900 text-white rounded-xl font-medium ${props.className}`}
    >
      {children}
    </div>
  );
}
