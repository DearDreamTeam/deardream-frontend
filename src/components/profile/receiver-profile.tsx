// app/page.tsx
"use client";

import { ReceiverProfileInfo } from "@/stores/useReceiverStore";

interface RecieverProfileProps {
  setEditReceiverProfile?: React.Dispatch<
    React.SetStateAction<ReceiverProfileInfo>
  >;
  editReceiverProfile?: ReceiverProfileInfo;
}

const RecieverProfile = ({
  setEditReceiverProfile,
  editReceiverProfile,
}: RecieverProfileProps) => {
  return (
    //toDo: 이 부분 디자인에 안나와 있어서 디자인 나오면 tailwind까지 수정하겠습니다
    <>
      <div className="flex-start text-grey-700 text-label-2 flex flex-col gap-2">
        전화번호
        <input
          type="text"
          name="phone"
          id="phone"
          className="text-grey-700 placeholder:text-grey-400 border-grey-400 text-headline-3 w-80 border-b-1 border-solid py-2 focus:ring-0 focus:outline-none"
          placeholder="전화번호를 - 없이 입력해주세요"
          value={editReceiverProfile?.phone}
          onChange={(e) => {
            if (setEditReceiverProfile) {
              setEditReceiverProfile((prev) => ({
                ...prev,
                phone: e.target.value,
              }));
            }
          }}
        />
      </div>
    </>
  );
};
export default RecieverProfile;
