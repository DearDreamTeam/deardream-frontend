import Dialog from "./dialog";
import { ConfirmDialogProps } from "@/types/dialog-props";

const ConfirmDialog = ({
  title,
  content,
  setIsOpen,
  action,
  actionLabel = "삭제",
}: ConfirmDialogProps) => {
  return (
    <Dialog>
      <Dialog.Message>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>{content}</Dialog.Content>
      </Dialog.Message>
      <Dialog.Actions>
        <button
          type="button"
          onClick={action}
          className="modal-btn border-r-grey-200 border-r text-green-300"
        >
          {actionLabel}
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="modal-btn text-grey-700"
        >
          취소
        </button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default ConfirmDialog;
