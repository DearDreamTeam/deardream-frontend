import Dialog from "./dialog";

const AlertDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <Dialog.Message>{children}</Dialog.Message>
      <Dialog.Actions>
        <button className="text-main-red-300 modal-btn">확인</button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default AlertDialog;
