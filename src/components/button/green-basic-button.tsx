"use client";

import React from "react";

const GreenBasicButton = ({
  children,
  handleState,
  onClick,
  state,
  link,
  color = "300",
}: {
  children: React.ReactNode;
  handleState?: () => boolean | void;
  state?: boolean;
  link?: string;
  onClick?: () => void;
  color?: string;
}) => {
  return (
    <div
      className={`px-auto inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg py-3.5 ${
        state
          ? "bg-grey-200 text-grey-500 cursor-not-allowed"
          : `bg-green-${color} ${color === "100" ? "text-green-300" : "text-grey-0"}`
      } cursor-pointer`}
      aria-disabled={state}
      onClick={() => {
        if (onClick) {
          onClick();
        }
        if (handleState) {
          const result = handleState();
          if (result === false) return;
        }
        if (link) {
          window.location.href = link;
        }
      }}
    >
      <div className="text-headline-3">{children}</div>
    </div>
  );
};
export default GreenBasicButton;
