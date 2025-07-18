import SortOption from "./sort-option";
import FavoriteFilter from "./favorite-filter";
import { FilterBarProps } from "../letters-props";
import ResetButton from "./reset-button";

const FilterBar = ({
  postCount,
  showOnlyFavorites,
  setShowOnlyFavorites,
  sortOption,
  setSortOption,
}: FilterBarProps) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="text-title-2 text-grey-600">{postCount}개</div>
      <div className="text-grey-500 flex gap-1">
        <ResetButton
          setShowOnlyFavorites={setShowOnlyFavorites}
          setSortOption={setSortOption}
        />
        <FavoriteFilter
          showOnlyFavorites={showOnlyFavorites}
          setShowOnlyFavorites={setShowOnlyFavorites}
        />
        <SortOption sortOption={sortOption} setSortOption={setSortOption} />
      </div>
    </div>
  );
};

export default FilterBar;
