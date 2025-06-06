import Edit from "@/public/icons/modal/edit.svg";
import Delete from "@/public/icons/modal/delete.svg";

const EditDeleteModal = () => {
  return (
    <div className="modal-container-b">
      <div className="modal-bg" />
      <div className="flex flex-col gap-2 py-[1.52rem]">
        <div className="modal-main rounded-sm">
          <button className="modal-btn-wide flex gap-2">
            <Edit />
            <span>수정하기</span>
          </button>
          <button className="text-main-red-300 modal-btn-wide flex gap-2">
            <Delete />
            <span>삭제하기</span>
          </button>
        </div>

        <button className="modal-main modal-btn-wide rounded-lg">취소</button>
      </div>
    </div>
  );
};

export default EditDeleteModal;
