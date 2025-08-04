// app/(auth-protected)/layout.tsx
"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useUserStore } from "@/stores/useUserInfoStore";
import LogoHeader from "@/components/header/logo-header";
import NavigationBar from "@/components/gnb/navigation-bar";
import { useInvitationStore } from "@/stores/useInvitationStore";
import { usePlanStore } from "@/stores/usePlanStore";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { updateUserProfile, userProfile } = useUserStore();
  const { setFamilyLink } = useInvitationStore();
  const { setPlan } = usePlanStore();

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

    (async () => {
      try {
        const res = await axios.get("/v1/users/me");
        const userData = res.data.result;
        updateUserProfile(userData);
      } catch (err) {
        console.error("사용자 인증 실패", err);
        localStorage.clear();
        router.replace("/login");
      }
    })();
  }, [router, updateUserProfile, skipAuthCheck]);

  useEffect(() => {
    if (!userProfile.familyRegistered) return;

    const fetchPlanAndLink = async () => {
      try {
        const res = await axios.get(
          `/v1/test/payment/request/status/${userProfile.familyId}`,
        );
        const result = res.data.result;
        setPlan({ isActive: result.isActive, type: result.type });

        if (result.isActive) {
          const linkRes = await axios.get("/v1/family/link");
          setFamilyLink(linkRes.data.result);
        }
      } catch (error) {
        console.error("플랜/링크 로딩 실패", error);
      }
    };

    fetchPlanAndLink();
  }, [
    userProfile.familyId,
    userProfile.familyRegistered,
    setFamilyLink,
    setPlan,
  ]);

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
