"use client";

import { PostcardProps } from "@/types/postcard-props";
import { useState } from "react";

const PostContext = ({ content }: Pick<PostcardProps, "content">) => {
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
