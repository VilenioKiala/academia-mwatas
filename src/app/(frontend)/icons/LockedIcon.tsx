import { SVGAttributes } from "react";

type LockedIconProps = SVGAttributes<SVGElement>;

export default function LockedIcon({ ...props }: LockedIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.4054 11.0424H6.51649C5.65738 11.0424 4.96094 11.9378 4.96094 13.0424V20.0424C4.96094 21.1469 5.65738 22.0424 6.51649 22.0424H17.4054C18.2645 22.0424 18.9609 21.1469 18.9609 20.0424V13.0424C18.9609 11.9378 18.2645 11.0424 17.4054 11.0424Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.96094 11.0424V7.93125C7.96094 6.89985 8.38236 5.9107 9.13251 5.18139C9.88266 4.45208 10.9001 4.04236 11.9609 4.04236C13.0218 4.04236 14.0392 4.45208 14.7894 5.18139C15.5395 5.9107 15.9609 6.89985 15.9609 7.93125V11.0424"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="11.9609" cy="17.0424" r="2.5" stroke="black" />
    </svg>
  );
}
