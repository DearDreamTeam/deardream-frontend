"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, memo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Header from "@/components/common/header";
import axios from "@/lib/axios";
import { PATH } from "@/constants/path";
import { FAMILY_RELATION, FamilyRelation } from "@/constants/family-relation";
import { useUserStore } from "@/stores/useUserInfoStore";
import { useReceiverStore } from "@/stores/useReceiverStore";
import { UserProfileInfo } from "@/types/user-info";
import { ReceiverProfileInfo } from "@/stores/useReceiverStore";
import Crown from "@/public/icons/common/crown.svg";
import KakaoShareScript from "@/components/scripts/kakao-share-script";

const Add = dynamic(() => import("@/public/icons/common/add.svg"));
const ShareOptions = dynamic(
  () => import("@/components/modal/share-options/share-options"),
);
const Loading = dynamic(() => import("@/components/loading-fallback/loading"));

const SenderInfo = memo(({ user }: { user: UserProfileInfo }) => (
  <div className="flex h-16 w-full items-center gap-3">
    <Image
      src={user.profileImage || "/images/default-img.svg"}
      alt="프로필 이미지"
      width={54}
      height={54}
      className="aspect-square rounded-full object-cover"
      loading="eager"
      priority
    />
    <div className="flex w-full flex-col justify-center">
      <span className="text-title-2 flex gap-1">
        {user.name} {user.role === "LEADER" && <Crown />}
      </span>
      <span className="text-label-2 text-grey-400">
        {user.relation === "OTHER"
          ? user.otherRelation
          : user.relation && FAMILY_RELATION[user.relation as FamilyRelation]}
      </span>
    </div>
  </div>
));
SenderInfo.displayName = "SenderInfo";

const ReceiverInfo = memo(
  ({ user, isLeader }: { user: ReceiverProfileInfo; isLeader: boolean }) => {
    const router = useRouter();
    return (
      <div className="flex h-16 w-full items-center justify-between gap-3">
        <Image
          src={user.profileImage || "/images/default-img.svg"}
          alt="프로필 이미지"
          width={54}
          height={54}
          className="rounded-full object-cover"
          loading="eager"
          priority
        />
        <div className="flex w-full flex-col justify-center">
          <span className="text-title-2 flex gap-1">{user.name}</span>
          {isLeader && (
            <span
              className="text-label-2 text-grey-400 cursor-pointer"
              onClick={() => router.push("/mypage/myfamily/receiver")}
            >
              받는 분 정보 수정
            </span>
          )}
        </div>
      </div>
    );
  },
);
ReceiverInfo.displayName = "ReceiverInfo";

const MyFamilyClient = () => {
  const router = useRouter();
  const { receiver, setReceiver } = useReceiverStore();
  const [family, setFamily] = useState<UserProfileInfo[]>([]);
  const { userProfile } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [familyRes, receiverRes] = await Promise.all([
          axios.get("/v1/family"),
          userProfile.role === "LEADER"
            ? axios.get("/v1/recipient")
            : Promise.resolve(null),
        ]);

        setFamily(familyRes.data.result.members);
        setReceiver({
          name: familyRes.data.result.recipientName,
          profileImage: familyRes.data.result.recipientProfileImage,
        });

        if (userProfile.role === "LEADER" && receiverRes) {
          setReceiver(receiverRes.data.result);
        }
      } catch (e) {
        console.error("데이터 불러오기 오류", e);
      } finally {
        setIsLoading(false);
      }
    };

    if (userProfile.familyRegistered) fetchData();
    else setIsLoading(false);
  }, [userProfile.familyRegistered, userProfile.role, setReceiver]);

  if (userProfile.id === -1 || isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-grey-0 overflow-auto-hide-scroll flex h-full w-full flex-1 flex-col items-center p-4 pt-0">
      <Header link={PATH.MYPAGE}>나의 가족</Header>
      {!userProfile.familyRegistered && (
        <div className="mt-auto mb-auto flex w-full flex-col items-center justify-center gap-3">
          <div className="flex w-full flex-col items-center text-center">
            <div className="text-grey-900 text-lg leading-relaxed font-semibold">
              구독 내역이 없어요
            </div>
            <div className="text-grey-600 text-base leading-normal">
              이어드림 플랜을 구독하시면
              <br />
              전체 서비스를 이용하실 수 있어요
            </div>
          </div>

          <button
            onClick={() => router.push(PATH.SUBSCRIBE)}
            className="rounded bg-green-300 px-4 py-2 text-lg leading-relaxed font-semibold text-neutral-50"
          >
            구독하러 가기
          </button>
        </div>
      )}

      <div className="mt-4 flex w-full flex-col justify-center">
        {userProfile.familyRegistered && (
          <>
            <div className="mb-4 flex w-full flex-col">
              <div className="text label-2 text-grey-400 w-full">받는 분</div>
              <ReceiverInfo
                user={receiver}
                isLeader={userProfile.role === "LEADER"}
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <div className="text label-2 text-grey-400 w-full">구성원</div>
              {family.map((member, idx) => (
                <SenderInfo key={idx} user={member} />
              ))}
            </div>

            <div
              className="mt-4 flex w-full cursor-pointer items-center gap-3"
              onClick={() => setIsOpen(true)}
            >
              <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-green-100 p-1.5">
                <Add />
              </div>
              <div className="text-title-2 text-grey-500">새 멤버 초대하기</div>
            </div>
          </>
        )}
      </div>

      {isOpen && <ShareOptions setIsOpen={setIsOpen} />}
      <KakaoShareScript />
    </div>
  );
};

export default MyFamilyClient;
