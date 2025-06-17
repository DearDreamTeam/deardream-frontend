// app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/public/logo/mainLogo.svg";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="absolute inset-0 z-[100] flex items-center justify-center bg-[#C4EAFF]">
      <Logo alt="이어드림 로고" className="" />
    </main>
  );
}
