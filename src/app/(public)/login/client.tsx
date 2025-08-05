// app/page.tsx
"use client";
import EllipseImage from "@/components/images/ellipse-image";
import RibbonImage from "@/components/images/ribbon-image";
import StateTemplate from "@/components/template/state-template";
import KaKao from "@/public/images/kakao.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInvitationStore } from "@/stores/useInvitationStore";
import { useUserStore } from "@/stores/useUserInfoStore";
import { PATH } from "@/constants/path";
import { getAccessToken } from "@/lib/token";
import axios from "@/lib/axios";
import Loading from "@/components/loading-fallback/loading";
const LoginPageClient = () => {
  //초대 코드 파라미터 추출
  const searchParams = useSearchParams();
  const inviteCode = searchParams.get("familylink");

  const { setFamilyLink } = useInvitationStore();
  const { updateUserProfile } = useUserStore();

  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  //초대 코드 파라미터 추출
  useEffect(() => {
    if (inviteCode) {
      setFamilyLink(inviteCode);
    }
  }, [inviteCode, setFamilyLink]);

  //사용자 정보 조회
  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    const checkUser = async () => {
      try {
        if (token) {
          const res = await axios.get("/v1/users/me");
          if (res.status === 200) {
            const userData = res.data.result;
            updateUserProfile({
              ...userData,
            });
            if (inviteCode && !userData.familyRegistered) {
              router.replace(PATH.RELATION + "?familyLink=" + inviteCode);
            } else {
              router.replace(PATH.HOME);
            }
            return;
          }
        }
      } catch {
        localStorage.clear();
        setIsLoading(false);
      }
    };
    checkUser();
  }, [updateUserProfile, router, inviteCode]);

  if (isLoading) return <Loading />;

  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  //카카오로그인 URL 생성 함수
  const handleLogin = () => {
    const kakaoURL = new URL("https://kauth.kakao.com/oauth/authorize");
    kakaoURL.searchParams.append("client_id", REST_API_KEY);
    kakaoURL.searchParams.append("redirect_uri", REDIRECT_URI);
    kakaoURL.searchParams.append("response_type", "code");

    if (inviteCode) {
      kakaoURL.searchParams.append("state", inviteCode);
    }

    window.location.href = kakaoURL.toString();
  };

  return (
    <>
      <div className="flex h-full flex-col items-center justify-between bg-green-100 p-4">
        <StateTemplate>
          <StateTemplate.ImageFiled>
            <EllipseImage color="gray-0" isBackground={true} />
            <RibbonImage />
          </StateTemplate.ImageFiled>
          <StateTemplate.Title> 로그인이 필요해요</StateTemplate.Title>
          <StateTemplate.Content>
            우리 모두가 다 함께
            <br />
            이야기를 나누고, 마음을 이어가기 위해
            <br />
            로그인이 필요해요.
          </StateTemplate.Content>
        </StateTemplate>

        <div
          onClick={handleLogin}
          className="relative z-100 flex h-14 w-full cursor-pointer items-center justify-center rounded-lg bg-[#FEE500]"
        >
          <KaKao
            alt="카카오 로그인"
            className="pointer-events-none absolute top-1/2 left-7 -translate-x-1/2 -translate-y-1/2"
          />
          <div className="text-title-1 leading-tight font-normal">
            카카오톡으로 10초만에 로그인
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPageClient;
