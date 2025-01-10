import { SVGAttributes } from "react";

export default function LogoutIcon({
  fill,
  ...props
}: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="37"
      height="43"
      viewBox="0 0 37 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_60_224)">
        <path
          d="M21.1428 37.625H28.1904C29.125 37.625 30.0213 37.2475 30.6821 36.5755C31.343 35.9035 31.7142 34.992 31.7142 34.0417V8.95833C31.7142 8.00797 31.343 7.09654 30.6821 6.42453C30.0213 5.75253 29.125 5.375 28.1904 5.375H21.1428"
          stroke={fill || "white"}
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.80957 30.4583L4.673e-05 21.5L8.80957 12.5417"
          stroke={fill || "white"}
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M-3.57628e-05 21.5H21.1428"
          stroke={fill || "white"}
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_60_224">
          <rect
            width="37"
            height="43"
            fill={fill || "white"}
            transform="matrix(-1 0 0 1 37 0)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
