import { useRef, useEffect, useCallback } from "react";
import { SetIsOpenType } from "@/types/set-open-type";

/* 모달 외부를 클릭하면 모달을 닫는 훅 */
export const useOutsideClick = <T extends HTMLElement>(
  setIsOpen: SetIsOpenType,
) => {
  const ref = useRef<T>(null);
  const onClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onClose]);

  return {
    modalRef: ref,
    closeModal: onClose,
  };
};
