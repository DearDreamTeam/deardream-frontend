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

import { useEffect, useMemo, useState } from "react";
import ConfirmDialog from "@/components/modal/dialog/confirm-dialog";
import { useUserStore } from "@/stores/useUserInfoStore";
import AlertDialog from "@/components/modal/dialog/alert-dialog";
import axios from "@/lib/axios";
import { usePlanStore } from "@/stores/usePlanStore";

const SectionItem = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      className="text-title-2 text-grey-700 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const MyPage = () => {
  const router = useRouter();

  type DialogType = "LOGOUT" | "FORBIDDEN" | null;
  const [dialog, setDialog] = useState<DialogType>(null);

  const { userProfile } = useUserStore();
  const { plan } = usePlanStore();

  useEffect(() => {
    if (!userProfile.familyId) return;
    const fetchPlan = async () => {
      try {
        const response = await axios.get(
          `/v1/test/payment/request/status/${userProfile.familyId}`,
        );
        console.log("response", response);
      } catch (error) {
        console.error("Error fetching plan:", error);
      }
    };
    fetchPlan();
  }, [userProfile.familyId]);

  const imageUrl = useMemo(() => {
    const kakaoDefault =
      "http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg";

    const cleaned = userProfile?.profileImage
      ?.trim()
      .replace(/[\u200B-\u200D\uFEFF]/g, "");
    return !cleaned || cleaned === kakaoDefault
      ? "/images/default-img.svg"
      : cleaned;
  }, [userProfile?.profileImage]);

  const handleSubscriptionClick = () => {
    if (userProfile.role === "USER") {
      setDialog("FORBIDDEN");
      return;
    }

    if (plan.isActive) {
      router.push("/mypage/subscribe");
    } else if (userProfile.role === "LEADER") {
      router.push("/mypage/subscribe/plan");
    } else {
      router.push("/subscribe");
    }
  };

  const sectionData = [
    {
      title: "가족",
      items: [
        { label: "나의 가족", onClick: () => router.push("/mypage/myfamily") },
      ],
    },
    {
      title: "정기구독",
      items: [
        { label: "나의 정기구독", onClick: handleSubscriptionClick },
        {
          label: "결제 내역",
          onClick: () => router.push("/mypage/payhistory"),
        },
      ],
    },
    {
      title: "도움말",
      items: [
        {
          label: "이어드림 가이드",
          onClick: () => router.push("/mypage/guide"),
        },
      ],
    },
    {
      title: "계정",
      items: [
        { label: "로그아웃", onClick: () => setDialog("LOGOUT") },
        { label: "회원 탈퇴", onClick: () => router.push("/mypage/quit") },
      ],
    },
  ];

  return (
    <>
      <div className="bg-grey-0 flex h-full w-full flex-col items-center p-4 pt-0">
        <Header>마이페이지</Header>

        <div className="overflow-auto-hide-scroll mt-4 flex w-full flex-col gap-8">
          <div
            className="flex cursor-pointer items-center gap-3"
            onClick={() => router.push("/mypage/profile")}
          >
            <div className="relative h-14 w-14">
              <Image
                src={imageUrl || "/images/default-img.svg"}
                alt="프로필 이미지"
                width={56}
                height={56}
                className="aspect-square rounded-full object-cover"
                loading="eager"
                priority
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
          {sectionData.map(({ title, items }) => (
            <Section key={title} title={title}>
              {items.map(({ label, onClick }) => (
                <SectionItem key={label} onClick={onClick}>
                  {label}
                </SectionItem>
              ))}
            </Section>
          ))}
        </div>
        {dialog === "LOGOUT" && (
          <ConfirmDialog
            title="로그아웃하시겠습니까?"
            content=""
            setIsOpen={() => setDialog(null)}
            action={() => {
              localStorage.clear();
              router.push("/onboarding");
            }}
            actionLabel="로그아웃"
          />
        )}
        {dialog === "FORBIDDEN" && (
          <AlertDialog
            title="접근 할 수 없습니다"
            content="리더만 접근 할 수 있습니다."
            setIsOpen={() => setDialog(null)}
          />
        )}
      </div>
    </>
  );
};
export default MyPage;
