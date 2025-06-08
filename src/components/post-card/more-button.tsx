"use client";

import { useState } from "react";
import More from "@/public/icons/post-card/more.svg";
import EditDeleteModal from "../modal/edit-delete/edit-delete-modal";

const MoreButton = () => {
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
        <EditDeleteModal setOpen={setIsEditDeleteModalOpen} />
      )}
    </div>
  );
};

export default MoreButton;
