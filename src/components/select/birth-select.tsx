import { useState } from "react";
import Check from "@/public/icons/common/check.svg";

const BirthdayInputs = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [isLunar, setIsLunar] = useState(false);

  const handleYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
    setYear(val);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setMonth(val);
  };

  const handleMonthBlur = () => {
    if (month.length === 1) {
      setMonth(month.padStart(2, "0"));
    } else if (parseInt(month) > 12) {
      setMonth("12");
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setDay(val);
  };

  const handleDayBlur = () => {
    if (day.length === 1) {
      setDay(day.padStart(2, "0"));
    } else if (parseInt(day) > 31) {
      setDay("31");
    }
  };
  return (
    <>
      <div className="flex w-80 items-center justify-center gap-2 text-lg text-gray-800">
        <div className="flex items-center">
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder="0000"
            className="w-20 border-b border-gray-300 bg-transparent text-center text-xl focus:outline-none"
            value={year}
            onChange={handleYear}
          />
          년
        </div>

        <div className="flex items-center">
          <input
            type="text"
            inputMode="numeric"
            maxLength={2}
            placeholder="00"
            className="w-12 border-b border-gray-300 bg-transparent text-center text-xl focus:outline-none"
            value={month}
            onChange={handleMonthChange}
            onBlur={handleMonthBlur}
          />
          월
        </div>

        <div className="flex items-center">
          <input
            type="text"
            inputMode="numeric"
            maxLength={2}
            placeholder="00"
            className="w-12 border-b border-gray-300 bg-transparent text-center text-xl focus:outline-none"
            value={day}
            onChange={handleDayChange}
            onBlur={handleDayBlur}
          />
          일
        </div>
      </div>
      <div className="flex justify-around gap-4">
        <div className="flex items-center gap-2">
          <div
            onClick={() => setIsLunar(!isLunar)}
            className={`${
              !isLunar ? "bg-rose-500" : "bg-gray-300"
            } inline-flex h-6 w-6 flex-col items-center justify-center gap-2.5 rounded-[40px] p-1`}
          >
            <Check />
          </div>
          양력
        </div>

        <div className="flex items-center gap-2">
          <div
            onClick={() => setIsLunar(!isLunar)}
            className={`${
              isLunar ? "bg-rose-500" : "bg-gray-300"
            } inline-flex h-6 w-6 flex-col items-center justify-center gap-2.5 rounded-[40px] p-1`}
          >
            <Check />
          </div>
          음력
        </div>
      </div>
    </>
  );
};

export default BirthdayInputs;
