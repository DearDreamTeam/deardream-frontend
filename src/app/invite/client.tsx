"use client";

import { useUserStore } from "@/stores/useUserInfoStore";
import StateTemplate from "@/components/template/state-template";
import LetterImage from "@/components/images/letter-image";
import EllipseImage from "@/components/images/ellipse-image";
import GreenBasicButton from "@/components/button/green-basic-button";

import { useSearchParams } from "next/navigation";
import { useInvitationStore } from "@/stores/useInvitationStore";
import { useEffect } from "react";

const InvitePageClient = () => {
  //유저 정보와 가족 정보가 일치하는 지 확인하기 위한 정보
  const { userProfile } = useUserStore();
  //초대 코드 파라미터 추출
  const searchParams = useSearchParams();
  const inviteCode = searchParams.get("familylink");
  //초대 코드 저장
  const { setFamilyLink } = useInvitationStore();

  //초대 코드 바뀔 때마다 저장
  useEffect(() => {
    if (inviteCode) {
      setFamilyLink(inviteCode);
    }
  }, [inviteCode]);

  return (
    <>
      {userProfile.familyId ? (
        <>
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4">
            <StateTemplate>
              <StateTemplate.ImageFiled>
                <EllipseImage color="green-100" />
                <LetterImage />
              </StateTemplate.ImageFiled>
              <StateTemplate.Title>초대장이 도착했어요</StateTemplate.Title>
              <StateTemplate.Content>
                이미 <strong>이쭈히</strong>님의 가족그룹에 속해있어요.
                <br />
                최신 소식을 확인하러 가볼까요?
              </StateTemplate.Content>
            </StateTemplate>
            <GreenBasicButton color="300">소식 남기러 가기</GreenBasicButton>
          </div>
        </>
      ) : (
        <>
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4">
            <StateTemplate>
              <StateTemplate.ImageFiled>
                <EllipseImage color="green-100" />
                <LetterImage />
              </StateTemplate.ImageFiled>
              <StateTemplate.Title>초대장이 도착했어요</StateTemplate.Title>
              <StateTemplate.Content>
                <strong>이쭈히</strong>님께서 당신을 초대했어요.
                <br />
                모두의 소식을 담은 이음레터로
                <br />
                <strong>이주힝</strong>님께 따뜻한 하루를 선물해보세요!
              </StateTemplate.Content>
            </StateTemplate>
            <GreenBasicButton
              color="300"
              link={`/login?familylink=${inviteCode}`}
            >
              소식 남기러 가기
            </GreenBasicButton>
          </div>
        </>
      )}
    </>
  );
};

export default InvitePageClient;
