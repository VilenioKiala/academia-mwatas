import React, { TextareaHTMLAttributes } from "react";

type TextareaProps = {
  label: string;
  error?: string;
  maxLength?: number;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({
  label,
  error,
  maxLength,
  ...props
}: TextareaProps) {
  return (
    <>
      <label>
        {label}
        <textarea
          {...props}
          maxLength={maxLength}
          className={`flex-1 w-full border-1 p-3 ${error ? "border-danger" : "border-black"} outline-none mt-1 p-3 resize-none border-opacity-15 focus:border-opacity-50 focus:border-myblue rounded-lg ${props.className}`}
        ></textarea>
      </label>
      <small className="text-danger">{error}</small>
    </>
  );
}
