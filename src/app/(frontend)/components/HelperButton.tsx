import { HTMLAttributes } from "react";

type HelperButtonProps = HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
};

export default function HelperButton({ ...props }: HelperButtonProps) {
  return (
    <button
      style={{
        borderRadius: "12px",
      }}
      {...props}
      className={` bg-slate-200 ${props.className}`}
    >
      {props.children}
    </button>
  );
}
