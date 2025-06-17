"use client";

import Edit from "@/public/icons/modal/edit.svg";
import Delete from "@/public/icons/modal/delete.svg";

import { useOutsideClick } from "@/hooks/use-outside-click";
import { SetIsOpenType } from "@/types/set-open-type";
import { usePostStore } from "@/stores/usePostStore";
import { useState } from "react";
import ConfirmDialog from "../dialog/confirm-dialog";

const EditDeleteModal = ({
  postId,
  setIsOpen,
}: {
  postId: number;
  setIsOpen: SetIsOpenType;
}) => {
  const { modalRef, closeModal } = useOutsideClick<HTMLDivElement>(setIsOpen);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { deletePost } = usePostStore();

  return (
    <div className="modal-container-b">
      <div className="modal-bg" />
      <div ref={modalRef} className="flex flex-col gap-2 py-[1.52rem]">
        <div className="modal-main rounded-sm">
          <button className="modal-btn-wide flex gap-2">
            <Edit />
            <span>수정하기</span>
          </button>
          <button
            onClick={() => setIsConfirmOpen(true)}
            className="text-main-red-300 modal-btn-wide flex gap-2"
          >
            <Delete />
            <span>삭제하기</span>
          </button>
          {isConfirmOpen && (
            <ConfirmDialog
              setIsOpen={setIsConfirmOpen}
              action={() => deletePost(postId)}
            >
              한 번 삭제하면 다시 되돌릴 수 없어요.
              <br />
              그래도 삭제하시겠어요?
            </ConfirmDialog>
          )}
        </div>

        <button
          onClick={closeModal}
          className="modal-main modal-btn-wide rounded-lg"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default EditDeleteModal;
