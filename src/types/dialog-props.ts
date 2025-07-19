import { SetIsOpenType } from "./set-open-type";

export interface DialogProps {
  title: string;
  content: string | React.JSX.Element[];
  setIsOpen: SetIsOpenType;
  onAction?: () => void;
}

export interface ConfirmDialogProps extends DialogProps {
  action: () => void;
  actionLabel?: string;
  cancelAction?: () => void;
}
