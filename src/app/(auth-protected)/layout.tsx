// app/(auth-protected)/layout.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      router.replace("/login");
      return;
    }

    const checkUser = async () => {
      try {
        const res = await axios.get("/v1/users/me");
        console.log("사용자 정보:", res.data);
      } catch (err) {
        console.error("사용자 인증 실패", err);
        alert("로그인이 필요합니다.");
        router.replace("/login");
      }
    };

    checkUser();
  }, []);

  return <>{children}</>;
}
