// app/page.tsx
"use client";
import SelectModal from "@/components/select/select-modal";
import { FAMILY_RELATION } from "@/constants/family-relation";
import { UserProfileInfo } from "@/types/user-info";
import { useState } from "react";
interface SenderProfileProps {
  editUserProfile?: UserProfileInfo;
  setEditUserProfile?: React.Dispatch<React.SetStateAction<UserProfileInfo>>;
}

const SenderProfile = ({
  editUserProfile,
  setEditUserProfile,
}: SenderProfileProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const relationship = editUserProfile?.relation || "";

  return (
    <>
      <div className="flex-start text-body-1 text-grey-400 flex flex-col gap-2">
        받는 분과의 관계
        <button
          type="button"
          className="text-grey-700 placeholder:text-grey-400 border-grey-300 text-title-1 w-80 border-b-1 border-solid px-1 py-2 text-left focus:ring-0 focus:outline-none"
          onClick={() => setIsModalOpen(true)}
        >
          {relationship ? (
            <span>
              {FAMILY_RELATION[relationship as keyof typeof FAMILY_RELATION]}
            </span>
          ) : (
            <span className="text-grey-400 text-title-3">
              관계를 선택해주세요
            </span>
          )}
        </button>
        {isModalOpen && setEditUserProfile && (
          <SelectModal
            selected={{ relationship }}
            setSelected={({ relationship }) => {
              setEditUserProfile((prev) => ({
                ...prev,
                relation: relationship,
                otherRelation: "",
              }));
            }}
            setIsModalOpen={setIsModalOpen}
          />
        )}
        {relationship === "OTHER" && (
          <input
            type="text"
            placeholder="관계를 직접 입력해주세요"
            className="text-grey-700 placeholder:text-grey-400 border-grey-300 text-title-1 w-80 border-b-1 border-solid px-1 py-2 text-left focus:ring-0 focus:outline-none"
            value={editUserProfile?.otherRelation || ""}
            onChange={
              setEditUserProfile
                ? (e) =>
                    setEditUserProfile((prev) => ({
                      ...prev,
                      otherRelation: e.target.value,
                    }))
                : undefined
            }
          />
        )}
      </div>
    </>
  );
};

export default SenderProfile;
