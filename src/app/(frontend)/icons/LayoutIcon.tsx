import { SVGAttributes } from "react";

const LayoutIcon = ({ fill, ...props }: SVGAttributes<SVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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
        d="M16.8835 10.0778C19.2235 10.495 21 12.5401 21 15C21 17.7614 18.7614 20 16 20C14.3644 20 12.9122 19.2147 12 18.0005M16.8835 10.0778C16.9598 9.73069 17 9.37004 17 9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9C7 9.37004 7.0402 9.73069 7.11646 10.0778M16.8835 10.0778C16.4528 12.0383 14.8716 13.5677 12.8835 13.9222M12.8835 13.9222C12.5967 13.9733 12.3015 14 12 14C9.60861 14 7.60934 12.3212 7.11646 10.0778M12.8835 13.9222C12.9598 14.2693 13 14.63 13 15C13 16.1258 12.6279 17.1647 12 18.0005M7.11646 10.0778C4.77645 10.495 3 12.5401 3 15C3 17.7614 5.23858 20 8 20C9.6356 20 11.0878 19.2147 12 18.0005"
        stroke={fill || "#000000"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
    </g>
  </svg>
);

export default LayoutIcon;
