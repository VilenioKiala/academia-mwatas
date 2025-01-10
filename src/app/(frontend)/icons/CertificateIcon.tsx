type CertificateIconProps = {
  fill?: string;
};

export default function CertificateIcon({ fill }: CertificateIconProps) {
  return (
    <svg
      width="40"
      height="30"
      viewBox="0 0 40 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_60_211)">
        <path
          d="M9.95736 15.1528L9.93616 23.0247H9.95736C10.1771 25.86 14.7409 28.1289 20.3523 28.1289C25.9638 28.1289 30.5277 25.8625 30.7474 23.0247H30.7679V14.8492L19.9997 20.012L9.95736 15.1528Z"
          stroke={fill || "white"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M38.1913 10.9629L20 20.0507L1.8075 10.9629L20 1.875L38.1913 10.9629Z"
          stroke={fill || "white"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.80811 23.6541V11.6812"
          stroke={fill || "white"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_60_211">
          <rect width="40" height="30" stroke={fill || "white"} />
        </clipPath>
      </defs>
    </svg>
  );
}
