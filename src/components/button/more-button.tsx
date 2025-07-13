"use client";

import { useState } from "react";

import More from "@/public/icons/post-card/more.svg";
import EditDeleteModal from "@/components/modal/edit-delete/edit-delete-modal";
import ConfirmDialog from "@/components//modal/dialog/confirm-dialog";
import { NOTIFICATION_MESSAGES } from "@/constants/messages";
import { renderMessageWithLineBreaks } from "@/utils/render-message-with-line-breaks";
import { deletePost } from "@/api/post";
import { useUserStore } from "@/stores/useUserStore";

const MoreButton = ({ postId }: { postId: number }) => {
  const [isEditDeleteModalOpen, setIsEditDeleteModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
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
          action={() => deletePost(useUserStore.getState().user.userId, postId)}
        />
      )}
    </div>
  );
};

export default MoreButton;
