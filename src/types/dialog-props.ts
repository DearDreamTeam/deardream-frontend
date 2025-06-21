import { SetIsOpenType } from "./set-open-type";

export interface DialogProps {
  setIsOpen: SetIsOpenType;
  children: React.ReactNode;
}

export interface ConfirmDialogProps extends DialogProps {
  action: () => void;
  actionLabel?: string;
}
