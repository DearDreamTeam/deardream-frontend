import { SetIsOpenType } from "./set-open-type";

export interface DialogProps {
  setIsOpen: SetIsOpenType;
  action?: () => void;
  children: React.ReactNode;
}
