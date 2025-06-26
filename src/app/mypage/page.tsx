// app/page.tsx
"use client";

import { useState } from "react";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex w-full flex-col gap-3">
    <div className="text-lg font-semibold text-zinc-900">{title}</div>
    <div className="flex flex-col gap-2 px-1">{children}</div>
  </div>
);

const SectionItem = ({ children }: { children: React.ReactNode }) => (
  <div className="text-base text-zinc-900">{children}</div>
);

const MyPage = () => {
  const [isleader] = useState(false);
  return (
    <>
      <div className="flex items-center p-4 text-2xl font-semibold">
        마이페이지
      </div>

      <div className="flex w-full flex-col gap-10 border-t border-[#EBEBF0] p-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-neutral-200" />
          <div className="flex flex-col justify-center space-y-1">
            <div className="flex text-2xl text-zinc-900">
              <span className="font-semibold">김수진</span>
              <span className="font-normal">님</span>
            </div>
            <div className="flex gap-1.5 text-xs text-neutral-400">
              <span>{isleader ? "가족 대표" : "가족 구성원"}</span>
              <span>딸</span>
            </div>
          </div>
        </div>

        <Section title="가족">
          <SectionItem>나의 가족</SectionItem>
          <SectionItem>받는 분 정보</SectionItem>
        </Section>

        <Section title="정기구독">
          <SectionItem>나의 정기구독</SectionItem>
          <SectionItem>결제 내역</SectionItem>
        </Section>
      </div>

      <div className="absolute bottom-0 flex w-full items-center justify-center p-4 text-[#72717D]">
        <button className="max-w-xs rounded-md p-3 text-center text-xs font-normal text-zinc-500">
          로그아웃
        </button>
        <button className="max-w-xs rounded-md p-3 text-center text-xs font-normal text-zinc-500">
          회원 탈퇴
        </button>
      </div>
    </>
  );
};
export default MyPage;
