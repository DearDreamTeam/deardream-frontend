"use client";

import { PostCardType } from "@/types/post-card-type";
import { useState } from "react";

const PostContext = ({ content }: Pick<PostCardType, "content">) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleContent = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <p
      onClick={handleToggleContent}
      className={`text-body-2 my-2 cursor-pointer text-gray-600 ${isExpanded || "line-clamp-3"}`}
    >
      {content}
    </p>
  );
};

export default PostContext;
