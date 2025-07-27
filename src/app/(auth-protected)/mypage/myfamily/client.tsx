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
      className="rounded-full object-cover"
      placeholder="blur"
      blurDataURL="/images/blur-default.svg" // or base64 tiny image
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
          placeholder="blur"
          blurDataURL="/images/blur-default.svg" // or base64 tiny image
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
  const { receiver, setReceiver } = useReceiverStore();
  const [family, setFamily] = useState<UserProfileInfo[]>([]);
  const { userProfile } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [familyRes, receiverRes] = await Promise.all([
          axios.get("/v1/family"),
          userProfile.role === "LEADER"
            ? axios.get("/v1/recipient")
            : Promise.resolve(null),
        ]);

        setFamily(familyRes.data.result.members);

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
  }, [userProfile.familyRegistered, userProfile.role, setReceiver]);

  if (isLoading) return <Loading />;

  return (
    <div className="bg-grey-0 flex h-screen w-full flex-col items-center p-4 pt-0">
      <Header link={PATH.MYPAGE}>나의 가족</Header>

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
    </div>
  );
};

export default MyFamilyClient;
