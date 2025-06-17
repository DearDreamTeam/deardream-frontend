"use client";

import { useState } from "react";
import More from "@/public/icons/post-card/more.svg";
import EditDeleteModal from "@/components/modal/edit-delete/edit-delete-modal";

const MoreButton = ({ postId }: { postId: number }) => {
  const [isEditDeleteModalOpen, setIsEditDeleteModalOpen] = useState(false);

  return (
    <div className="flex">
      <button
        onClick={() => setIsEditDeleteModalOpen(true)}
        className="text-gray-500"
      >
        <More />
      </button>

      {isEditDeleteModalOpen && (
        <EditDeleteModal postId={postId} setIsOpen={setIsEditDeleteModalOpen} />
      )}
    </div>
  );
};

export default MoreButton;
