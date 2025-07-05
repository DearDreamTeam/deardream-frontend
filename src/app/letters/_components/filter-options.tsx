import ArrowDown from "@/public/icons/letters/arrow-down.svg";

const FilterOptions = () => {
  return (
    <div className="flex gap-2 py-[0.88rem]">
      <button className="letters-btn">
        <span>즐겨찾기</span>
      </button>
      <button className="letters-btn">
        <span className="min-w-[3.625rem]">연도별</span>
        <ArrowDown />
      </button>
    </div>
  );
};

export default FilterOptions;
