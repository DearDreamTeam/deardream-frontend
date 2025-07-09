"use client";

import React from "react";

const GreenBasicButton = ({
  children,
  handleState,
  state,
  link,
}: {
  children: React.ReactNode;
  handleState?: () => boolean | void;
  state?: boolean;
  link?: string;
}) => {
  return (
    <div
      className={`px-auto inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg py-3.5 ${
        state
          ? "bg-grey-200 text-grey-500 cursor-not-allowed"
          : "bg-green-300 text-white"
      } cursor-pointer`}
      aria-disabled={state}
      onClick={() => {
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
