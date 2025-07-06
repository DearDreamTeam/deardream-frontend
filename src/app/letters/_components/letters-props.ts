import { Dispatch, SetStateAction } from "react";

export type SortKey = "NEWEST" | "OLDEST" | null;

export const SORT_OPTION_ITEM = {
  NEWEST: "최신순",
  OLDEST: "오래된순",
};

export type PostCountProp = {
  postCount: number;
};

export type FavoriteFilterProps = {
  showOnlyFavorites: boolean;
  setShowOnlyFavorites: Dispatch<SetStateAction<boolean>>;
};

export type SortOptionProps = {
  sortOption: SortKey;
  setSortOption: Dispatch<SetStateAction<SortKey>>;
};

export type FilterBarProps = PostCountProp &
  FavoriteFilterProps &
  SortOptionProps;

export type ResetButtonProps = Pick<
  FavoriteFilterProps,
  "setShowOnlyFavorites"
> &
  Pick<SortOptionProps, "setSortOption">;
