// app/(auth-protected)/layout.tsx
"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useUserStore } from "@/stores/useUserInfoStore";
import LogoHeader from "@/components/header/logo-header";
import NavigationBar from "@/components/gnb/navigation-bar";
import { useInvitationStore } from "@/stores/useInvitationStore";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { updateUserProfile, userProfile } = useUserStore();
  const { setFamilyLink } = useInvitationStore();

  const pathname = usePathname();

  const skipAuthCheck = pathname === "/mypage/quit/complete";

  useEffect(() => {
    if (skipAuthCheck) return;

    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      alert("로그인이 필요합니다.");
      localStorage.clear();
      router.replace("/login");
      return;
    }

    const checkUser = async () => {
      try {
        console.log("사용자 정보 조회중");
        const res = await axios.get("/v1/users/me");
        console.log("사용자 정보:", res.data);

        const userData = res.data.result;
        updateUserProfile({
          ...userData,
        });
        console.log("userProfile", userProfile);
      } catch (err) {
        console.error("사용자 인증 실패", err);
      }
    };
    if (userProfile.id <= 0) {
      checkUser();
    }

  }, [updateUserProfile, router, setFamilyLink, skipAuthCheck]);

  useEffect(() => {
    if (userProfile.familyRegistered) {
      const checkFamilyLink = async () => {
        try {
          const res = await axios.get("/v1/family/link");
          if (res.status === 200) {
            setFamilyLink(res.data.result);
          }
        } catch {
          console.log("가족 링크 조회 실패");
        }
      };
      checkFamilyLink();
    } else {
      return;
    }
  }, [userProfile.familyRegistered, setFamilyLink]);

  return (
    <>
      <div className="shadow-default bg-grey-50 mx-auto flex h-full max-w-[768px] flex-col justify-between">
        <LogoHeader />
        <main className="flex-1 overflow-hidden">{children}</main>
        <NavigationBar />
      </div>
    </>
  );
}
