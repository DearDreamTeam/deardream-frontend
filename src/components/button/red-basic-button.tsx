"use client";

import React from "react";

const RedBasicButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-auto mx-2 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg bg-rose-500 py-3.5">
      <div className="text-lg font-semibold text-white">{children}</div>
    </div>
  );
};
export default RedBasicButton;
