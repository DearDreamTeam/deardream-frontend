"use client";

import { useRouter } from "next/navigation";
import Arrow from "@/public/icons/letters/arrow-back.svg";

const Header = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div className="text-headline-3 flex items-center border-b border-gray-200 px-5 py-3">
      {children != "마이페이지" && (
        <Arrow className="cursor-pointer" onClick={() => router.back()} />
      )}
      {children}
    </div>
  );
};
export default Header;
