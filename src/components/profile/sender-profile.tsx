// app/page.tsx
"use client";
import SelectModal from "@/components/select/select-modal";
import { useState } from "react";

const SenderProfile = () => {
  const [selected, setSelected] = useState({
    relationship: "", // 기본값 필수
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex-start flex flex-col gap-2 text-sm font-normal text-zinc-900">
        받는 분과의 관계
        <button
          className="text-grey-700 placeholder:text-grey-400 w-80 border-b-1 border-solid border-[#EBEBF0] px-1 py-2 text-left text-xl font-medium focus:ring-0 focus:outline-none"
          onClick={() => setIsModalOpen(true)}
        >
          {selected.relationship ? (
            <span className="text-[#1C1C1C]">{selected.relationship}</span>
          ) : (
            <span className="text-[#9A9A9A]">관계를 선택해주세요</span>
          )}
        </button>
      </div>
      {isModalOpen && (
        <SelectModal
          selected={selected}
          setSelected={setSelected}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};
export default SenderProfile;
