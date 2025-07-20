import Dialog from "./dialog";
import { DialogProps } from "@/types/dialog-props";

const AlertDialog = ({ title, content, setIsOpen, onAction }: DialogProps) => {
  return (
    <Dialog>
      <Dialog.Message>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>{content}</Dialog.Content>
      </Dialog.Message>
      <Dialog.Actions>
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            onAction?.();
          }}
          className="modal-btn text-green-300"
        >
          확인
        </button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default AlertDialog;
