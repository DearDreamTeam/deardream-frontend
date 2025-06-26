"use client";

import React from "react";

const RedBasicButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-auto inline-flex h-12 items-center justify-center gap-2.5 rounded-lg bg-rose-500 py-3.5">
      <div className="text-lg font-semibold text-white">{children}</div>
    </div>
  );
};
export default RedBasicButton;
