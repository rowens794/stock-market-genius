import React from "react";

export default function icon({ size, color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={`#${color}`} width={`${size}px`} height={`${size}px`}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z" />
    </svg>
  );
}