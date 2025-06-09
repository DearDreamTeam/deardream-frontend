import Dialog from "./dialog";
import { DialogProps } from "@/types/dialog-props";

const AlertDialog = ({ setIsOpen, children }: DialogProps) => {
  return (
    <Dialog>
      <Dialog.Message>{children}</Dialog.Message>
      <Dialog.Actions>
        <button
          onClick={() => setIsOpen(false)}
          className="text-main-red-300 modal-btn"
        >
          확인
        </button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default AlertDialog;
