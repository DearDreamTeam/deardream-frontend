"use client";

import ArrowBack from "@/public/icons/common/arrow_back_ios.svg";
import ArrowFront from "@/public/icons/common/arrow_front_ios.svg";
import { useSuperAdminStore } from "@/stores/admin/useSuperAdminStroe";
import { useRef } from "react";

const MonthPicker = () => {
  const { pivotDate, setPivotDate } = useSuperAdminStore();
  const monthRef = useRef<HTMLInputElement>(null);
  return (
    <section className="flex w-full flex-col items-center justify-center">
      <div className="text-headline-0 text-grey-700 flex gap-4">
        <button
          onClick={() =>
            setPivotDate(
              new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1, 1),
            )
          }
        >
          <ArrowBack />
        </button>
        <button onClick={() => monthRef.current?.showPicker()}>
          {pivotDate.getFullYear()}년 {pivotDate.getMonth()}월
        </button>
        <button
          onClick={() =>
            setPivotDate(
              new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 1),
            )
          }
        >
          <ArrowFront />
        </button>
      </div>

      <input
        ref={monthRef}
        type="month"
        value={`${pivotDate.getFullYear()}-${String(pivotDate.getMonth() + 1).padStart(2, "0")}`}
        onChange={(e) => setPivotDate(new Date(e.target.value))}
        className="opacity-0"
      />
    </section>
  );
};

export default MonthPicker;
