"use client";

import ArrowDown from "@/public/icons/letters/arrow-up.svg";
import { useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div
        className="flex w-[6.5rem] cursor-pointer justify-end"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>최신순</span>
        <div className="scale-y-[-1]">
          <ArrowDown />
        </div>
      </div>
      {isOpen && (
        <div className="bg-grey-0 border-grey-200 absolute w-[6.5rem] rounded-sm border py-1 text-center">
          <button id="NEWEST" className="cursor-pointer px-2">
            최신순
          </button>
          <button id="OLDEST" className="cursor-pointer px-2">
            오래된순
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
