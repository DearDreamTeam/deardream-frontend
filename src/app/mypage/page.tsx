// app/page.tsx
"use client";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex w-full flex-col gap-1">
    <div className="text-sm leading-tight font-semibold text-zinc-400">
      {title}
    </div>
    <div className="flex w-full flex-col gap-2">{children}</div>
  </div>
);

import Header from "@/components/common/header";
import { useRouter } from "next/navigation";

const SectionItem = ({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) => {
  const router = useRouter();
  return (
    <div
      className="text-title-2 cursor-pointer"
      onClick={() => router.push("/mypage/" + link)}
    >
      {children}
    </div>
  );
};

const MyPage = () => {
  const router = useRouter();
  return (
    <>
      <Header>마이페이지</Header>

      <div className="flex w-full flex-col gap-10 p-4">
        <div
          className="flex cursor-pointer items-center gap-4"
          onClick={() => router.push("/mypage/profile")}
        >
          {/* 프로필 이미지 */}
          <div className="text-grey-200 h-14 w-14 rounded-full" />
          <div className="flex flex-col justify-center space-y-1">
            <div className="text-headline-1 m-0">
              <span>김수진</span>
            </div>

            <div className="text-body-2 text-grey-500 flex gap-1.5">
              <span>내 정보 수정</span>
            </div>
          </div>
        </div>

        <Section title="가족">
          <SectionItem link="/myfamily">나의 가족</SectionItem>
        </Section>

        <Section title="정기구독">
          <SectionItem link="">나의 정기구독</SectionItem>
        </Section>
        <Section title="도움말">
          <SectionItem link="">이어드림 가이드</SectionItem>
        </Section>
        <Section title="계정">
          <SectionItem link="">로그아웃</SectionItem>
          <SectionItem link="">회원 탈퇴</SectionItem>
        </Section>
      </div>
    </>
  );
};
export default MyPage;
