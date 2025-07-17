// app/page.tsx
"use client";
import SelectModal from "@/components/select/select-modal";
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
      <div className="flex-start text-label-2 flex flex-col gap-2">
        받는 분과의 관계
        <button
          type="button"
          className="text-grey-700 placeholder:text-grey-400 border-grey-300 text-headline-3 w-80 border-b-1 border-solid px-1 py-2 text-left focus:ring-0 focus:outline-none"
          onClick={() => setIsModalOpen(true)}
        >
          {relationship ? (
            <span>{relationship}</span>
          ) : (
            <span className="text-grey-400">관계를 선택해주세요</span>
          )}
        </button>
      </div>
      {isModalOpen && setEditUserProfile && (
        <SelectModal
          selected={{ relationship }}
          setSelected={({ relationship }) => {
            setEditUserProfile((prev) => ({
              ...prev,
              relation: relationship,
            }));
          }}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default SenderProfile;
