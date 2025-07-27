"use client";

import GreenBasicButton from "@/components/button/green-basic-button";
import EllipseImage from "@/components/images/ellipse-image";
import RibbonImage from "@/components/images/ribbon-image";
import Loading from "@/components/loading-fallback/loading";
import SelectModal from "@/components/select/select-modal";
import StateTemplate from "@/components/template/state-template";
import { FAMILY_RELATION } from "@/constants/family-relation";

import { PATH } from "@/constants/path";
import { useInvitationStore } from "@/stores/useInvitationStore";
import { useReceiverStore } from "@/stores/useReceiverStore";
import { useUserStore } from "@/stores/useUserInfoStore";
import axios from "@/lib/axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { updateProfile } from "@/api/profile";
import AlertDialog from "@/components/modal/dialog/alert-dialog";

const RelationClient = () => {
  const searchParams = useSearchParams();
  const familyLink = searchParams.get("familyLink");
  const [isLoading, setIsLoading] = useState(false);

  const { setFamilyLink } = useInvitationStore();
  const { setReceiver } = useReceiverStore();

  const { receiver } = useReceiverStore();
  const { userProfile, setUserProfile } = useUserStore();

  const relationship = userProfile?.relation || "";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await updateProfile(userProfile);
      if (response.status === 200) {
        console.log(response.data);
        if (familyLink) {
          router.push(`${PATH.FAMILY_INVITE}/family?familyLink=${familyLink}`);
        } else {
          setIsAlertOpen(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkFamilyLink = async () => {
      if (!familyLink) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const response = await axios.get(`/v1/family/invitation`, {
          params: {
            code: familyLink,
          },
        });
        if (response.status === 200) {
          setFamilyLink(familyLink);
          setReceiver({ name: response.data.result.recipientName });
          console.log(response.data.result);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    checkFamilyLink();
  }, [familyLink, setFamilyLink, setReceiver, setIsLoading]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex h-full w-full flex-col items-center justify-center gap-2 p-4"
        >
          <StateTemplate>
            <StateTemplate.ImageFiled>
              <EllipseImage color="green-100" isBackground={true} />
              <RibbonImage />
            </StateTemplate.ImageFiled>
            <StateTemplate.Content>
              <strong>{receiver.name ?? "수신자"}</strong>님과 어떤
              관계이신가요?
              <br />
              관계를 선택해주세요.
            </StateTemplate.Content>
            <button
              type="button"
              className="text-grey-700 placeholder:text-grey-400 border-grey-300 text-title-1 mt-8 w-80 border-b-1 border-solid px-1 py-2 text-left focus:ring-0 focus:outline-none"
              onClick={() => setIsModalOpen(true)}
            >
              {relationship ? (
                <span className="text-title-1">
                  {
                    FAMILY_RELATION[
                      relationship as keyof typeof FAMILY_RELATION
                    ]
                  }
                </span>
              ) : (
                <span className="text-grey-400 text-title-3">선택해주세요</span>
              )}
            </button>
            {isModalOpen && (
              <SelectModal
                selected={{ relationship }}
                setSelected={({ relationship }) => {
                  setUserProfile({
                    ...userProfile,
                    relation: relationship,
                  });
                }}
                setIsModalOpen={setIsModalOpen}
              />
            )}
            {relationship === "OTHER" && (
              <input
                type="text"
                placeholder="관계를 직접 입력해주세요"
                className="text-grey-700 placeholder:text-title-3 border-grey-300 text-title-1 w-80 border-b-1 border-solid px-1 py-2 text-left focus:ring-0 focus:outline-none"
                value={userProfile?.otherRelation || ""}
                onChange={(e) => {
                  setUserProfile({
                    ...userProfile,
                    otherRelation: e.target.value,
                  });
                }}
              />
            )}
          </StateTemplate>

          <GreenBasicButton color="300" disabled={!relationship}>
            저장
          </GreenBasicButton>
        </form>
      )}

      {isAlertOpen && (
        <AlertDialog
          title="관계 설정이 완료되었어요"
          content="소식지를 받아보러 가볼까요?"
          setIsOpen={setIsAlertOpen}
          onAction={() => router.push(PATH.HOME)}
        />
      )}
    </>
  );
};

export default RelationClient;
