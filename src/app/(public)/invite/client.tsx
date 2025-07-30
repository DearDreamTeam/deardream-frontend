"use client";

import { useUserStore } from "@/stores/useUserInfoStore";
import StateTemplate from "@/components/template/state-template";
import LetterImage from "@/components/images/letter-image";
import EllipseImage from "@/components/images/ellipse-image";
import GreenBasicButton from "@/components/button/green-basic-button";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useInvitationStore } from "@/stores/useInvitationStore";
import { PATH } from "@/constants/path";
import axios from "@/lib/axios";
import { useReceiverStore } from "@/stores/useReceiverStore";

const InvitePageClient = () => {
  //유저 정보와 가족 정보가 일치하는 지 확인하기 위한 정보
  const { userProfile } = useUserStore();
  //초대 코드 파라미터 추출
  const searchParams = useSearchParams();
  const inviteCode = searchParams.get("familylink");
  //초대 코드 저장
  const { setFamilyLink } = useInvitationStore();
  const { receiver, setReceiver } = useReceiverStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isLeader, setIsLeader] = useState(null);

  const router = useRouter();

  //초대 코드 바뀔 때마다 저장
  useEffect(() => {
    if (inviteCode) {
      setFamilyLink(inviteCode);
    }
  }, [inviteCode, setFamilyLink]);

  useEffect(() => {
    if (!inviteCode) {
      router.replace("/");
      return;
    }
    const checkFamilyLink = async () => {
      try {
        const response = await axios.get(`/v1/family/invitation`, {
          params: {
            code: inviteCode,
          },
        });
        if (response.status === 200) {
          setFamilyLink(inviteCode);
          setReceiver({ name: response.data.result.recipientName });
          setIsLoading(false);
          setIsLeader(response.data.result.leaderName);
        }
      } catch {
        alert("초대 코드가 유효하지 않습니다.");
        router.replace("/");
      }
    };
    checkFamilyLink();
  }, [inviteCode, setFamilyLink, setReceiver, setIsLoading, setIsLeader]);

  return (
    <>
      {isLoading ? (
        <>
          <div className="text-grey-800 flex h-full flex-col items-center justify-center gap-6 bg-green-100 text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-green-600" />
            <div className="text-xl font-semibold">
              정보를 불러오는 중입니다
            </div>
            <p className="text-grey-500 animate-pulse text-base">
              잠시만 기다려 주세요...
            </p>
          </div>
        </>
      ) : (
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
                    이미 가족 그룹에 속해있어요.
                    <br />
                    최신 소식을 확인하러 가볼까요?
                  </StateTemplate.Content>
                </StateTemplate>
                <GreenBasicButton color="300" link={PATH.HOME}>
                  소식 남기러 가기
                </GreenBasicButton>
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
                    <strong>{isLeader}</strong>님께서 당신을 초대했어요.
                    <br />
                    모두의 소식을 담은 이음레터로
                    <br />
                    <strong>{receiver.name}</strong>님께 따뜻한 하루를
                    선물해보세요!
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
      )}
    </>
  );
};

export default InvitePageClient;
