"use client";

import { useState } from "react";
import PostList from "../post-list/post-list";
import FilterBar from "../filter-bar/filter-bar";
import { SortKey } from "../letters-props";
import { useLettersStore } from "@/stores/useLettersStore";

const PostboxViewer = () => {
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [sortOption, setSortOption] = useState<SortKey>(null);

  return (
    <div className="overflow-auto-hide-scroll px-4">
      <FilterBar
        postCount={useLettersStore.getState().newsletters.length}
        showOnlyFavorites={showOnlyFavorites}
        setShowOnlyFavorites={setShowOnlyFavorites}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <PostList showOnlyFavorites={showOnlyFavorites} sortOption={sortOption} />
    </div>
  );
};

export default PostboxViewer;
