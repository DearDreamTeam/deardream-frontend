// app/page.tsx
"use client";
import Invite from "@/public/images/mail-blueinvite.svg";
import KaKao from "@/public/images/kakao.svg";
import { useRouter } from "next/navigation";
const InvitePage = () => {
  const router = useRouter();
  return (
    <>
      <div className="relative flex h-screen flex-col items-center justify-center gap-6 bg-[#F6F8FA]">
        <Invite alt="이어드림 초대장" className="" />

        <div className="justify-start self-stretch text-center text-2xl leading-9 font-semibold text-zinc-900">
          초대장이 도착했어요
        </div>
        <div className="justify-start self-stretch text-center text-base leading-normal font-light text-zinc-900">
          <span className="text-base font-semibold text-zinc-900">김순자</span>
          님께서 당신을 초대했어요.
          <br />
          모두의 소식을 담은 이음레터로
          <br />
          <span className="text-base font-semibold text-zinc-900">이은희</span>
          님께 따뜻한 하루를 선물해보세요!
        </div>
        <div className="h-15 w-10" />
        <div
          onClick={() => router.replace("/profile")}
          className="absolute bottom-10 flex h-12 w-[80%] cursor-pointer items-center justify-center rounded-md bg-[#FEE500]"
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
    </>
  );
};

export default InvitePage;
