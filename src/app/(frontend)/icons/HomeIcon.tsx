import { SVGAttributes } from "react";

type HomeIconProps = {
  fill?: string;
} & SVGAttributes<SVGElement>;

export default function HomeIcon({ fill, ...props }: HomeIconProps) {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.75 17.25L23 3.83333L40.25 17.25V38.3333C40.25 39.35 39.8461 40.325 39.1272 41.0439C38.4084 41.7628 37.4333 42.1667 36.4167 42.1667H9.58333C8.56667 42.1667 7.59165 41.7628 6.87276 41.0439C6.15387 40.325 5.75 39.35 5.75 38.3333V17.25Z"
        stroke={fill || "white"}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.25 42.1667V23H28.75V42.1667"
        stroke={fill || "white"}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
