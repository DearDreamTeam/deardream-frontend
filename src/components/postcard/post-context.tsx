"use client";

import { Post } from "@/types/post-type";
import { useState } from "react";

const PostContext = ({ content }: Pick<Post, "content">) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleContent = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <p
      onClick={handleToggleContent}
      className={`text-title-3 text-grey-600 my-2 cursor-pointer ${isExpanded || "line-clamp-3"}`}
    >
      {content}
    </p>
  );
};

export default PostContext;
