import { SVGAttributes } from "react";

type ArrowDownIconProps = SVGAttributes<SVGElement>;

export default function ArrowDownIcon({ ...props }: ArrowDownIconProps) {
  return (
    <svg
      width="19"
      height="11"
      viewBox="0 0 19 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.75 1.625L9.5 9.375L17.25 1.625"
        stroke="black"
        className={props.className}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
