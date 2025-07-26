"use client";
import Header from "@/components/common/header";
import Crown from "@/public/icons/common/crown.svg";
import { useEffect, useState } from "react";
import Image from "next/image";
import Add from "@/public/icons/common/add.svg";
import ShareOptions from "@/components/modal/share-options/share-options";
import axios from "@/lib/axios";
import { UserProfileInfo } from "@/types/user-info";
import {
  ReceiverProfileInfo,
  useReceiverStore,
} from "@/stores/useReceiverStore";
import { useUserStore } from "@/stores/useUserInfoStore";
import { useRouter } from "next/navigation";
import { FAMILY_RELATION, FamilyRelation } from "@/constants/family-relation";
import { PATH } from "@/constants/path";
import Loading from "@/components/loading-fallback/loading";

const SenderInfo = ({ children }: { children: UserProfileInfo }) => {
  return (
    <div className="flex h-16 w-full items-center gap-3">
      <div className="relative h-[54px] min-w-[54px]">
        <Image
          src={`${children.profileImage || "/images/default-img.svg"}`}
          alt="프로필 이미지"
          fill
          className="rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/images/default-img.svg";
          }}
        />
      </div>
      <div className="flex w-full flex-col justify-center">
        <span className="text-title-2 flex gap-1">
          {children.name}{" "}
          {"role" in children && children.role === "LEADER" && <Crown />}
        </span>
        <span className="text-label-2 text-grey-400">
          {children.relation === "OTHER"
            ? children.otherRelation
            : children.relation &&
              FAMILY_RELATION[children.relation as FamilyRelation]}
        </span>
      </div>
    </div>
  );
};

const ReceiverInfo = ({
  children,
  isLeader,
}: {
  children: ReceiverProfileInfo;
  isLeader: boolean;
}) => {
  const router = useRouter();
  return (
    <div className="flex h-16 w-full items-center justify-between gap-3">
      <div className="relative h-[54px] min-w-[54px]">
        <Image
          src={`${children.profileImage || "/images/default-img.svg"}`}
          alt="프로필 이미지"
          fill
          className="rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/images/default-img.svg";
          }}
        />
      </div>
      <div className="flex w-full flex-col justify-center">
        <span className="text-title-2 flex gap-1">{children.name}</span>
        {isLeader && (
          <span
            className="text-label-2 text-grey-400 cursor-pointer"
            onClick={() => {
              router.push("/mypage/myfamily/receiver");
            }}
          >
            받는 분 정보 수정
          </span>
        )}
      </div>
    </div>
  );
};

const MyFamilyPage = () => {
  //   const [isleader, setIsLeader] = useState(false);
  const { receiver, setReceiver } = useReceiverStore();
  const [family, setFamily] = useState<UserProfileInfo[]>([]);
  const { userProfile } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReceiver = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/v1/recipient");
        console.log("Receiver data fetched successfully:", response.data);
        setReceiver(response.data.result);
      } catch (error) {
        console.error("Error fetching receiver data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchFamilyData = async () => {
      if (!userProfile.familyRegistered) {
        return;
      }
      try {
        setIsLoading(true);
        const response = await axios.get("/v1/family");
        setFamily(response.data.result.members);
        console.log("Family data fetched successfully:", response.data);
        if (userProfile.role !== "LEADER") {
          setReceiver({
            ...receiver,
            name: response.data.result.recipientName,
          });
          console.log("Receiver data fetched successfully:", receiver);
        }
      } catch (error) {
        console.error("Error fetching family data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userProfile.role === "LEADER") {
      fetchReceiver();
    }
    fetchFamilyData();
  }, [userProfile.role, setReceiver]);

  return (
    <>
      {!isLoading ? (
        <div className="bg-grey-0 flex h-screen w-full flex-col items-center p-4 pt-0">
          <Header link={PATH.MYPAGE}>나의 가족</Header>

          <div className="mt-4 flex w-full flex-col justify-center">
            {/* 프로필 섹션 */}
            {userProfile.familyRegistered && (
              <>
                <div className="mb-4 flex w-full flex-col">
                  <div className="text label-2 text-grey-400 w-full">
                    받는 분
                  </div>
                  <ReceiverInfo isLeader={userProfile.role === "LEADER"}>
                    {receiver}
                  </ReceiverInfo>
                </div>

                <div className="flex w-full flex-col gap-2">
                  <div className="text label-2 text-grey-400 w-full">
                    구성원
                  </div>
                  {family.map((member, index) => (
                    <SenderInfo key={index}>{member}</SenderInfo>
                  ))}
                </div>
                <div
                  className="mt-4 flex w-full cursor-pointer items-center gap-3"
                  onClick={() => setIsOpen(true)}
                >
                  <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-green-100 p-1.5">
                    <Add />
                  </div>
                  <div className="text-title-2 text-grey-500">
                    새 멤버 초대하기
                  </div>
                </div>
              </>
            )}
          </div>
          {isOpen && <ShareOptions setIsOpen={setIsOpen} />}
        </div>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
};

export default MyFamilyPage;
