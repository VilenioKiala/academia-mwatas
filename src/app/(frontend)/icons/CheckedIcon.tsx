import { SVGAttributes } from "react";

type CheckedIconProps = SVGAttributes<SVGElement>;

export default function CheckedIcon({ ...props }: CheckedIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      height="800px"
      width="800px"
      version="1.1"
      id="Layer_1"
      viewBox="0 0 512.42 512.42"
      {...props}
    >
      <g>
        <g>
          <path d="M509.313,67.45c-4.16-4.16-10.88-4.267-15.04-0.107L134.06,422.33l-115.2-121.6c-3.733-4.48-10.453-5.12-15.04-1.387    c-4.48,3.733-5.12,10.453-1.387,15.04c0.32,0.32,0.533,0.64,0.853,0.96l122.667,129.493c1.92,2.133,4.693,3.307,7.573,3.307h0.213    c2.773,0,5.44-1.067,7.467-3.093l368-362.667C513.473,78.33,513.473,71.61,509.313,67.45z" />
        </g>
      </g>
    </svg>
  );
}
