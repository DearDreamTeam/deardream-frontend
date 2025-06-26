"use client";

import React from "react";

const GrayBasicButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-auto inline-flex h-12 items-center justify-center gap-2.5 rounded-lg bg-neutral-200 py-3.5">
      <div className="text-lg font-semibold text-zinc-800">{children}</div>
    </div>
  );
};
export default GrayBasicButton;
