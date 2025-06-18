// app/page.tsx
"use client";
import Invite from "@/public/images/mail-invite.svg";
import KaKao from "@/public/images/kakao.svg";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  return (
    <>
      <div className="relative flex h-screen flex-col items-center justify-center">
        <div className="justify-start text-2xl leading-loose font-bold text-black">
          로그인이 필요해요
        </div>
        <Invite alt="이어드림 초대장" className="mb-8" />
        <div className="text-s h-16 w-64 justify-start text-center leading-tight font-normal text-black">
          가족 소식 책자에 참여하려면 먼저 <br />
          로그인 또는 회원가입을 해주세요
        </div>
        <div className="fixed bottom-0 h-40 w-full rounded-3xl bg-[#D9D9D9] p-6 md:max-w-[375px]">
          <div
            onClick={() => router.replace("/profile")}
            className="relative flex h-12 w-full cursor-pointer items-center justify-center rounded-md bg-[#FEE500]"
          >
            <KaKao
              alt="카카오 로그인"
              className="absolute top-1/2 left-7 -translate-x-1/2 -translate-y-1/2"
            />
            <div className="text-[13px] leading-tight font-normal text-zinc-900">
              카카오톡으로 10초만에 로그인/회원가입
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
