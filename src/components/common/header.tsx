"use client";

import { useRouter } from "next/navigation";
import Arrow from "@/public/icons/common/arrow-back.svg";

const Header = ({
  children,
  link,
  setIsModalOpen,
}: {
  children: React.ReactNode;
  link?: string;
  setIsModalOpen?: (isOpen: boolean) => void;
}) => {
  const router = useRouter();
  return (
    <div className="text-headline-3 text-grey-900 flex w-screen max-w-[768px] items-center border-b border-gray-200 px-4 py-3">
      {children != "마이페이지" && (
        <Arrow
          className="cursor-pointer"
          onClick={() => {
            if (setIsModalOpen) {
              setIsModalOpen(true);
              return;
            }
            if (link) {
              router.push(link);
            } else {
              router.back();
            }
          }}
        />
      )}
      {children}
    </div>
  );
};
export default Header;
