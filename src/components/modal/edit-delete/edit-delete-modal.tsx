"use client";

import { useRouter } from "next/navigation";

import Edit from "@/public/icons/modal/edit.svg";
import Delete from "@/public/icons/modal/delete.svg";

import { useOutsideClick } from "@/hooks/use-outside-click";
import { SetIsOpenType } from "@/types/set-open-type";
import { PATH } from "@/constants/path";

const EditDeleteModal = ({
  postId,
  setIsOpen,
  setIsConfirmOpen,
}: {
  postId: number;
  setIsOpen: SetIsOpenType;
  setIsConfirmOpen: SetIsOpenType;
}) => {
  const { modalRef, closeModal } = useOutsideClick<HTMLDivElement>(setIsOpen);
  const router = useRouter();

  return (
    <div className="modal-container-b">
      <div className="modal-bg" />
      <div ref={modalRef} className="flex flex-col gap-2 py-[1.52rem]">
        <div className="modal-main text-label-2 text-grey-700 rounded-sm">
          <button
            onClick={() => router.push(PATH.LETTER_EDIT(postId))}
            className="modal-btn-wide flex gap-2"
          >
            <Edit />
            <span>수정하기</span>
          </button>
          <button
            onClick={() => {
              setIsConfirmOpen(true);
              closeModal();
            }}
            className="modal-btn-wide flex gap-2"
          >
            <Delete />
            <span>삭제하기</span>
          </button>
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
