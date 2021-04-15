import React from "react";

export default function icon({ size, color }) {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={`#${color}`} width={`${size}px`} height={`${size}px`}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      </svg>
    </>
  );
}
