import { SVGAttributes } from "react";

type CredentialsIconProps = {
  fill?: string;
} & SVGAttributes<SVGElement>;

export default function CredentialsIcon({
  fill,
  ...props
}: CredentialsIconProps) {
  return (
    <svg
      fill={fill || "#000000"}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 92 92"
      enableBackground="new 0 0 92 92"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          id="XMLID_1277_"
          d="M62.3,55.5c7.7,0,14-6.3,14-14c0-7.7-6.3-14-14-14s-14,6.3-14,14C48.3,49.2,54.6,55.5,62.3,55.5z M62.3,33.5c4.4,0,8,3.6,8,8c0,4.4-3.6,8-8,8s-8-3.6-8-8C54.3,37.1,57.9,33.5,62.3,33.5z M15.7,35c0-1.7,1.3-3,3-3h17.4 c1.7,0,3,1.3,3,3s-1.3,3-3,3H18.7C17,38,15.7,36.7,15.7,35z M36.1,49H18.7c-1.7,0-3-1.3-3-3s1.3-3,3-3h17.4c1.7,0,3,1.3,3,3 S37.8,49,36.1,49z M31.7,57c0,1.7-1.3,3-3,3H18.7c-1.7,0-3-1.3-3-3s1.3-3,3-3h10.1C30.4,54,31.7,55.3,31.7,57z M92,22.6 c0-3.6-3-6.6-6.6-6.6H6.6C3,16,0,19,0,22.6v46.8C0,73,3,76,6.6,76h78.8c3.6,0,6.6-3,6.6-6.6V22.6z M8,24h76v41.7 c-4.3-4.2-11.7-7-14.6-8c-0.6-0.2-1.3-0.2-2,0l-5.1,1.8l-5.1-1.8c-0.6-0.2-1.3-0.1-2,0.1C51.9,58.9,42.5,62,38.9,68H8V24z M47.7,68 c2.3-2,5.3-3,8.5-4.2l5.1,1.8c0.6,0.2,1.4,0.2,2,0l5.1-1.7c3.2,1.2,6.2,2.2,8.5,4.2H47.7z"
        ></path>{" "}
      </g>
    </svg>
  );
}
