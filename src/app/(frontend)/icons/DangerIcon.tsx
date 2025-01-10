import React from "react";

export default function DangerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80px"
      height="80px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        className="stroke-red-500"
        strokeWidth="1.5"
      />
      <path
        d="M12 7V13"
        className="stroke-red-700"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16" r="1" className="stroke-red-700" />
    </svg>
  );
}
