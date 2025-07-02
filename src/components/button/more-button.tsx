"use client";

import { useState } from "react";

import More from "@/public/icons/post-card/more.svg";
import EditDeleteModal from "@/components/modal/edit-delete/edit-delete-modal";
import ConfirmDialog from "@/components//modal/dialog/confirm-dialog";
import { usePostStore } from "@/stores/usePostStore";
import { NOTIFICATION_MESSAGES } from "@/constants/messages";
import { renderMessageWithLineBreaks } from "@/utils/render-message-with-line-breaks";

const MoreButton = ({ postId }: { postId: number }) => {
  const [isEditDeleteModalOpen, setIsEditDeleteModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { deletePost } = usePostStore();

  return (
    <div className="flex">
      <button
        onClick={() => setIsEditDeleteModalOpen(true)}
        className="text-grey-300"
      >
        <More />
      </button>

      {isEditDeleteModalOpen && (
        <EditDeleteModal
          postId={postId}
          setIsOpen={setIsEditDeleteModalOpen}
          setIsConfirmOpen={setIsConfirmOpen}
        />
      )}
      {isConfirmOpen && (
        <ConfirmDialog
          title={NOTIFICATION_MESSAGES.DELETE_POST.title}
          content={renderMessageWithLineBreaks(
            NOTIFICATION_MESSAGES.DELETE_POST.content,
          )}
          setIsOpen={setIsConfirmOpen}
          action={() => deletePost(postId)}
        />
      )}
    </div>
  );
};

export default MoreButton;
