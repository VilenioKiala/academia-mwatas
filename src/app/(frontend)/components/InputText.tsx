import React, { InputHTMLAttributes, JSX } from "react";

type InputTextProps = {
  label?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  type: "text" | "password";
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputText({
  label,
  leftIcon,
  rightIcon,
  type,
  error,
  ...props
}: InputTextProps) {
  return (
    <label
      className={`
    fkex flex-col`}
    >
      <p className="mb-1">{label}</p>
      <div
        className={`flex items-center border  ${
          error ? " border-red-600" : "border-black"
        } border-opacity-30 rounded-lg focus-within:border-myblue focus-within:border-opacity-100 py-3 px-6 bg-white dark:bg-gray-900 ${
          props.className
        }`}
      >
        {leftIcon}
        <input
          type={type}
          {...props}
          className={`focus:outline-none mx-3 w-full bg-none dark:bg-gray-900 text-foreground`}
        />
        {rightIcon}
      </div>
      {error && <small className="text-red-500">{error}</small>}
    </label>
  );
}
