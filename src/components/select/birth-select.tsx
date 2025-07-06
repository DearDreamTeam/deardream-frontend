import { useEffect, useState } from "react";
import Check from "@/public/icons/common/check.svg";
import { UserProfile } from "@/types/user-info";
import { useUserStore } from "@/stores/useUserStore";

const BirthdayInputs = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [isLunar, setIsLunar] = useState(false);

  const { updateUserProfile } = useUserStore();

  const handleYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setYear(val);
  };

  const handleYearBlur = () => {
    if (parseInt(year) < 1900 || year.length < 4) {
      setYear("1900");
    } else if (parseInt(year) > new Date().getFullYear()) {
      setYear(new Date().getFullYear().toString());
    }
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

  // 날짜가 바뀌면 setPostUser에 업데이트
  useEffect(() => {
    if (year && month && day) {
      updateUserProfile({
        birth: {
          year: year,
          month: month,
          day: day,
          calendarType: isLunar ? "LUNAR" : "SOLAR",
        },
      } as UserProfile);
    }
  }, [year, month, day, isLunar, updateUserProfile]);

  return (
    <>
      <div className="flex w-80 items-center justify-between gap-2 text-lg text-gray-800">
        <div className="flex items-center">
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder="0000"
            className="w-20 border-b border-gray-300 bg-transparent text-center text-xl focus:outline-none"
            value={year}
            onChange={handleYear}
            onBlur={handleYearBlur}
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
      <div className="flex gap-10">
        <div className="flex items-center gap-2">
          양력
          <div
            onClick={() => setIsLunar(false)}
            className={`${
              !isLunar ? "bg-green-700" : "bg-gray-300"
            } inline-flex h-6 w-6 flex-col items-center justify-center gap-2.5 rounded-[40px] p-1`}
          >
            <Check />
          </div>
        </div>
        <div className="flex items-center gap-2">
          음력
          <div
            onClick={() => setIsLunar(true)}
            className={`${
              isLunar ? "bg-green-700" : "bg-gray-300"
            } inline-flex h-6 w-6 flex-col items-center justify-center gap-2.5 rounded-[40px] p-1`}
          >
            <Check />
          </div>
        </div>
      </div>
    </>
  );
};

export default BirthdayInputs;
