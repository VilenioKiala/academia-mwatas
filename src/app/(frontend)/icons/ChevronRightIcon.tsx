import { SVGAttributes } from "react";

export const ChevronRightIcon = ({
  strokeWidth = 1.5,
  ...otherProps
}: SVGAttributes<SVGElement>) => (
  <svg
    width="11"
    height="19"
    viewBox="0 0 11 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...otherProps}
  >
    <g clip-path="url(#clip0_85_189)">
      <path
        d="M1.625 17.25L9.375 9.5L1.625 1.75"
        stroke="black"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_85_189">
        <rect width="11" height="19" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
