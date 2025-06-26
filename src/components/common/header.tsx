"use client";

import { useRouter } from "next/navigation";
import Arrow from "@/public/icons/back/arrow.svg";

const Header = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div className="flex items-center border-b border-[#EBEBF0] p-4 text-2xl font-semibold">
      <Arrow className="cursor-pointer" onClick={() => router.back()} />
      {children}
    </div>
  );
};
export default Header;
