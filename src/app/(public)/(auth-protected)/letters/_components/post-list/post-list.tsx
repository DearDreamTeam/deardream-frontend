"use client";

import { useLettersStore } from "@/stores/useLettersStore";
import { PostListProps } from "../letters-props";
import PostItem from "./post-item";
import { useEffect } from "react";
import { getLikedPostId, getPostboxList, likeALetters } from "@/api/archive";
import { useUserStore } from "@/stores/useUserInfoStore";
import { generatePDFTest } from "@/api/test";

const PostList = ({ showOnlyFavorites, sortOption }: PostListProps) => {
  const { newsletters, bookmarks } = useLettersStore();
  const { userProfile } = useUserStore();

  useEffect(() => {
    if (userProfile.id) {
      const fetchData = async () => {
        await getLikedPostId(userProfile.id);
      };
      fetchData();
    }
  }, [userProfile.id]);

  useEffect(() => {
    if (userProfile.familyId) {
      // 한 달 체크 로직
      const fetchData = async () => {
        await generatePDFTest(userProfile.familyId);
        await getPostboxList(userProfile.familyId!);
      };
      fetchData();
    }
  }, [userProfile.familyId]);

  const handleLikeNews = (archiveId: number) => {
    likeALetters(userProfile.id, archiveId);
  };

  const filteredNewsletters = showOnlyFavorites
    ? newsletters.filter((news) => bookmarks.includes(news.archiveId))
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
          liked={bookmarks.includes(news.archiveId)}
        />
      ))}
    </div>
  );
};

export default PostList;
