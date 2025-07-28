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
    <div className="text-grey-400 text-sm leading-tight font-semibold">
      {title}
    </div>
    <div className="text-grey-700 flex w-full flex-col gap-2">{children}</div>
  </div>
);

import Header from "@/components/common/header";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useEffect, useState } from "react";
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
      className="text-title-2 text-grey-700 cursor-pointer"
      onClick={() => {
        if (link === "first-subscribe") {
          router.push("/subscribe");
        } else if (link === "logout") {
          if (setIsOpen) setIsOpen(true);
        } else {
          router.push("/mypage/" + link);
        }
      }}
    >
      {children}
    </div>
  );
};

const MyPage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { userProfile } = useUserStore();

  const formatImageUrl = (url?: string): string => {
    const kakaoDefaultImage =
      "http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg";

    const cleanedUrl = url?.trim().replace(/[\u200B-\u200D\uFEFF]/g, "");

    if (!cleanedUrl || cleanedUrl === kakaoDefaultImage) {
      console.log("default image url");
      return "/images/default-img.svg";
    }

    return cleanedUrl;
  };

  const [imageUrl, setImageUrl] = useState<string>(
    formatImageUrl(userProfile?.profileImage),
  );

  useEffect(() => {
    setImageUrl(formatImageUrl(userProfile?.profileImage));
  }, [userProfile?.profileImage]);

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
                src={imageUrl || "/images/default-img.svg"}
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
            <SectionItem
              link={
                userProfile.familyRegistered ? "subscribe" : "first-subscribe"
              }
            >
              나의 정기구독
            </SectionItem>
            <SectionItem link="payhistory">결제 내역</SectionItem>
          </Section>
          <Section title="도움말">
            <SectionItem link="guide">이어드림 가이드</SectionItem>
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
