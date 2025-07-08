import { FavoriteFilterProps } from "../letters-props";

const FavoriteFilter = ({
  showOnlyFavorites,
  setShowOnlyFavorites,
}: FavoriteFilterProps) => {
  return (
    <button
      className={`letters-btn ${showOnlyFavorites ? "letters-btn-active" : undefined}`}
      onClick={() => setShowOnlyFavorites((prev) => !prev)}
    >
      즐겨찾기
    </button>
  );
};

export default FavoriteFilter;
