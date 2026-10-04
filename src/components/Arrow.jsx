import * as React from "react";

export default function Arrow() {
  return (
    <svg
      className="diagonal-arrow"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 16 16 4M5 4h11v11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
