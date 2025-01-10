"use client";

import React, { InputHTMLAttributes } from "react";
import ShowPasswordIcon from "../icons/ShowPasswordIcon";
import HidePasswordIcon from "../icons/HidePasswordIcon";
import InputText from "./InputText";

type InputPasswordProps = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputPassword({
  label,
  error,
  ...props
}: InputPasswordProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  function handleShowHidePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <InputText
      {...props}
      type={showPassword ? "text" : "password"}
      rightIcon={
        <button onClick={() => handleShowHidePassword()} type="button">
          {showPassword ? (
            <HidePasswordIcon width="30" height="30" />
          ) : (
            <ShowPasswordIcon width="30" height="30" />
          )}
        </button>
      }
      label={label}
      className={`${props.className}`}
      name={props.name}
      error={error}
    />
  );
}
