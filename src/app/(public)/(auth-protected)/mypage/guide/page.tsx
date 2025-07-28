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

const GuidePage = () => {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center p-4 pt-0">
        <Header>이어드림 가이드</Header>
        <div className="flex w-full flex-col gap-4 py-4">
          <Section title="가족">
            <SectionItem link="guide/letter">
              어떤 소식을 남겨야 하나요?
            </SectionItem>
            <SectionItem link="guide/write">
              언제까지 작성해야 하나요?
            </SectionItem>
          </Section>

          <Section title="내 정보">
            <SectionItem link="guide/address">
              주소는 어떻게 변경하나요?
            </SectionItem>
            <SectionItem link="guide/plan">
              플랜은 어떻게 변경하나요? (가정)
            </SectionItem>
            <SectionItem link="guide/plan-facility">
              플랜은 어떻게 변경하나요? (시설)
            </SectionItem>
          </Section>
        </div>
      </div>
    </>
  );
};
export default GuidePage;
