import Favorite from "@/public/icons/letters/favorite.svg";
import ArrowDown from "@/public/icons/letters/arrow-down.svg";

const FilterOptions = () => {
  return (
    <div className="flex gap-2 py-[0.88rem]">
      <button className="letters-btn">
        <Favorite />
        <span>즐겨찾기</span>
      </button>
      <button className="letters-btn">
        <span>연도별</span>
        <ArrowDown />
      </button>
    </div>
  );
};

export default FilterOptions;
