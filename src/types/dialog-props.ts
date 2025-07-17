import { SetIsOpenType } from "./set-open-type";

export interface DialogProps {
  title: string;
  content: string | React.JSX.Element[];
  setIsOpen: SetIsOpenType;
}

export interface ConfirmDialogProps extends DialogProps {
  action: () => void;
  actionLabel?: string;
  cancelAction?: () => void;
}
