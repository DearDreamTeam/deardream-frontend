"use client";

import { useLettersStore } from "@/stores/useLettersStore";
import { PostListProps } from "../letters-props";
import PostItem from "./post-item";
import { useEffect } from "react";
import { getPostboxList, likeALetters } from "@/api/archive";
import { useUserStore } from "@/stores/useUserInfoStore";
// import { generatePDFTest } from "@/api/test";

const PostList = ({ showOnlyFavorites, sortOption }: PostListProps) => {
  const { newsletters } = useLettersStore();
  const { userProfile } = useUserStore();

  useEffect(() => {
    if (userProfile.familyId) {
      // 한 달 체크 로직
      const fetchData = async () => {
        // await generatePDFTest(userProfile.familyId);
        await getPostboxList(userProfile.familyId!);
      };
      fetchData();
    }
  }, [userProfile.familyId]);

  const handleLikeNews = (pdfId: number) => {
    likeALetters(userProfile.id, pdfId);
  };

  const filteredNewsletters = showOnlyFavorites
    ? newsletters.filter((news) => news.liked === true)
    : newsletters;
  const sortedNewsletters =
    sortOption === "OLDEST"
      ? [...filteredNewsletters].sort((a, b) => a.archiveId - b.archiveId)
      : [...filteredNewsletters].sort((a, b) => b.archiveId - a.archiveId);

  return (
    <div className="flex flex-wrap gap-x-3 gap-y-[2.12rem] py-7">
      {sortedNewsletters.map((news, index) => (
        <PostItem
          key={news.archiveId ?? index}
          {...news}
          setLikedToggle={handleLikeNews}
        />
      ))}
    </div>
  );
};

export default PostList;
