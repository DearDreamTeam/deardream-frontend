// app/(auth-protected)/layout.tsx
"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useUserStore } from "@/stores/useUserInfoStore";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { updateUserProfile } = useUserStore();

  const pathname = usePathname();

  const skipAuthCheck = pathname === "/mypage/quit/complete";

  useEffect(() => {
    if (skipAuthCheck) return;

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      localStorage.clear();
      router.replace("/login");
    }

    const checkUser = async () => {
      try {
        const res = await axios.get("/v1/users/me");
        console.log("사용자 정보:", res.data);
        if (res.status === 200) {
          const userData = res.data.result;
          updateUserProfile({
            id: userData.id,
            name: userData.name,
            birth: userData.birth,
            profileImage: userData.profileImage,
            calendarType: userData.calendarType,
            relation: userData.relation,
            otherRelation: userData.otherRelation,
            familyRegistered: userData.familyRegistered,
            familyId: userData.familyId,
          });
        } else {
          throw new Error("사용자 정보 조회 실패");
        }
      } catch (err) {
        console.error("사용자 인증 실패", err);
        alert("로그인이 필요합니다.");
        localStorage.clear();
        router.replace("/login");
      }
    };

    checkUser();
  }, []);

  return <>{children}</>;
}
