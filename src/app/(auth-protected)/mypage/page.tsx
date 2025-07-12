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
import Image from "next/image";

import { useState } from "react";
import ConfirmDialog from "@/components/modal/dialog/confirm-dialog";
import { useUserStore } from "@/stores/useUserInfoStore";

const SectionItem = ({
  children,
  link,
  setIsOpen,
}: {
  children: React.ReactNode;
  link: string;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  return (
    <div
      className="text-title-2 cursor-pointer"
      onClick={() =>
        link === "logout"
          ? setIsOpen && setIsOpen(true)
          : router.push("/mypage/" + link)
      }
    >
      {children}
    </div>
  );
};

const MyPage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { userProfile } = useUserStore();

  return (
    <>
      <div className="bg-grey-0 flex h-screen w-full flex-col items-center p-4 pt-0">
        <Header>마이페이지</Header>

        <div className="mt-4 flex w-full flex-col gap-8">
          <div
            className="flex cursor-pointer items-center gap-3"
            onClick={() => router.push("/mypage/profile")}
          >
            <div className="relative h-14 w-14">
              <Image
                src={"/images/default-img.svg"}
                alt="프로필 이미지"
                fill
                className="rounded-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center space-y-1">
              <div className="text-headline-1 m-0">
                <span>{userProfile.name}</span>
              </div>

              <div className="text-body-2 text-grey-500 flex gap-1.5">
                <span>내 정보 수정</span>
              </div>
            </div>
          </div>

          <Section title="가족">
            <SectionItem link="myfamily">나의 가족</SectionItem>
          </Section>

          <Section title="정기구독">
            <SectionItem link="subscribe">나의 정기구독</SectionItem>
          </Section>
          <Section title="도움말">
            <SectionItem link="">이어드림 가이드</SectionItem>
          </Section>
          <Section title="계정">
            <SectionItem link="logout" setIsOpen={setIsOpen}>
              로그아웃
            </SectionItem>
            <SectionItem link="quit">회원 탈퇴</SectionItem>
          </Section>
        </div>
        {isOpen && (
          <ConfirmDialog
            title="로그아웃하시겠습니까?"
            content=""
            setIsOpen={setIsOpen}
            action={() => {
              localStorage.clear();
              router.push("/onboarding");
            }}
            actionLabel="로그아웃"
          />
        )}
      </div>
    </>
  );
};
export default MyPage;
