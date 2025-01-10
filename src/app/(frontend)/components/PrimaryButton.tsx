"use client";

import { Button, ButtonProps } from "@material-tailwind/react";
import { HTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import TailSpin from "react-loading-icons/dist/esm/components/tail-spin";

type PrimaryButtonProps = HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
  loading?: boolean;
} & ButtonProps;

export default function PrimaryButton({
  loading,
  ...props
}: PrimaryButtonProps) {
  const { pending } = useFormStatus();

  return (
    <>
      <Button
        style={{
          background: "linear-gradient(94.57deg, #1F68B2 0%, #3751A3 113.45%)",
          borderRadius: "12px",
        }}
        disabled={loading || pending}
        className={`opacity-100 disabled:opacity-45 font-bold text-white py-3 px-8 bg-opacity-100 hover:brightness-125 ${props.className}`}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        {...props}
      >
        {!loading || !pending ? (
          props.children
        ) : (
          <TailSpin width={40} height={20} />
        )}
      </Button>
      {/* <button
        style={{
          background: "linear-gradient(94.57deg, #1F68B2 0%, #3751A3 113.45%)",
          borderRadius: "12px",
        }}
        disabled={loading || pending}
        {...props}
        className={`opacity-100 disabled:opacity-45 font-bold text-white py-3 px-8 bg-opacity-100 in hover:text-[1.06rem] hover:brightness-125 transition-all ${props.className}`}
      >
        {!loading || !pending ? (
          props.children
        ) : (
          <TailSpin width={40} height={20} />
        )}
      </button> */}
    </>
  );
}
