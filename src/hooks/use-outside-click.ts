import { useEffect } from "react";

export const useOutsideClick = <T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onOutsideClick: () => void,
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, onOutsideClick]);
};
