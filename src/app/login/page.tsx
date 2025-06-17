// app/page.tsx
"use client";
import Invite from "@/public/images/mail-invite.svg";
import KaKao from "@/public/images/kakao.svg";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  return (
    <>
      <div className="absolute inset-0 z-[100] mx-auto flex items-center justify-center rounded-lg bg-[#F5F5F5] p-8 shadow-lg md:max-w-[375px]">
        <div className="relative flex flex-col items-center">
          <div className="justify-start text-2xl leading-loose font-bold text-black">
            로그인이 필요해요
          </div>
          <Invite alt="이어드림 초대장" className="mb-8" />
          <div className="text-s h-16 w-64 justify-start text-center leading-tight font-normal text-black">
            가족 소식 책자에 참여하려면 먼저 <br />
            로그인 또는 회원가입을 해주세요
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 h-40 w-full max-w-md translate-x-[-50%] rounded-3xl bg-[#D9D9D9] p-6">
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
