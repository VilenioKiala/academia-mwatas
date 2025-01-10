import React, { HTMLAttributes } from "react";

type ErrorMessageProps = {
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function ErrorMessage({
  children,
  ...props
}: ErrorMessageProps) {
  return (
    <div
      {...props}
      className={`px-5 py-5 bg-red-600 border border-red-900 text-white rounded-xl font-medium ${props.className}`}
    >
      {children}
    </div>
  );
}
