"use client";

import ArrowDown from "@/public/icons/letters/arrow-down.svg";
import ArrowUp from "@/public/icons/letters/arrow-up.svg";
import { useState } from "react";

const mockServiceStartYear = 2022;

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const year = new Date().getFullYear();
  const viewYears = Array.from(
    { length: year - mockServiceStartYear + 1 },
    (_, i) => year - i,
  );

  return (
    <ul
      className={`bg-grey-0 shadow-default text-caption-2 text-grey-700 flex w-[4.375rem] flex-col gap-[0.38rem] rounded-sm py-[0.31rem] text-center`}
    >
      <button
        onClick={handleToggle}
        className="relative flex w-[3.96rem] items-center"
      >
        <li className="w-[3.68263rem]">전체</li>
        <div className="absolute right-0">
          {isOpen ? <ArrowDown /> : <ArrowUp />}
        </div>
      </button>
      <div className="">
        {isOpen &&
          viewYears.map((year) => (
            <li className="w-[3.68263rem] text-center" key={year}>
              {year} 년
            </li>
          ))}
      </div>
    </ul>
  );
};

export default Dropdown;
