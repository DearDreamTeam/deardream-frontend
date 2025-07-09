"use client";

import { useLettersStore } from "@/stores/useLettersStore";
import { PostListProps } from "../letters-props";
import PostItem from "./post-item";

const PostList = ({ showOnlyFavorites, sortOption }: PostListProps) => {
  const { newsletters, setLikedNews } = useLettersStore();

  const filteredNewsletters = showOnlyFavorites
    ? newsletters.filter((news) => news.liked === true)
    : newsletters;
  const sortedNewsletters =
    sortOption === "OLDEST"
      ? [...filteredNewsletters].sort((a, b) => a.timestamp - b.timestamp)
      : [...filteredNewsletters].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="flex flex-wrap gap-x-3 gap-y-[2.12rem] py-7">
      {sortedNewsletters.map((news) => (
        <PostItem key={news.pdfId} {...news} setLikedNews={setLikedNews} />
      ))}
    </div>
  );
};

export default PostList;
