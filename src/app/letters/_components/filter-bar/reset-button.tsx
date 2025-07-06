import Reset from "@/public/icons/letters/replay.svg";
import { ResetButtonProps } from "../letters-props";

const ResetButton = ({
  setShowOnlyFavorites,
  setSortOption,
}: ResetButtonProps) => {
  return (
    <button
      className="letters-btn"
      onClick={() => {
        setShowOnlyFavorites(false);
        setSortOption(null);
      }}
    >
      <Reset />
    </button>
  );
};

export default ResetButton;
