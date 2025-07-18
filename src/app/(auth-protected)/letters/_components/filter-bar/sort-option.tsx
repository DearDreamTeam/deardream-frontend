"use client";

import { useState } from "react";
import ArrowDown from "@/public/icons/letters/arrow-down.svg";
import { SORT_OPTION_ITEM, SortKey, SortOptionProps } from "../letters-props";

const SortOption = ({ sortOption, setSortOption }: SortOptionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortOptionClick = (key: SortKey) => {
    setSortOption(key);
    setIsOpen(false);
  };

  return (
    <div
      className={`relative w-[6.5rem] ${isOpen ? "bg-grey-0 rounded-t-sm" : undefined}`}
    >
      <button
        className={`letters-btn flex w-full justify-between ${sortOption ? "letters-btn-active" : undefined}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{sortOption ? SORT_OPTION_ITEM[sortOption] : "정렬옵션"}</span>
        <div className={`${isOpen ? "scale-y-[-1]" : undefined}`}>
          <ArrowDown />
        </div>
      </button>
      {isOpen && (
        <div className="bg-grey-0 absolute z-30 w-[6.5rem] rounded-b-sm">
          {Object.entries(SORT_OPTION_ITEM).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleSortOptionClick(key as SortKey)}
              className="letters-btn w-full"
            >
              {value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortOption;
