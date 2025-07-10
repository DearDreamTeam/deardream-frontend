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
      <div className="flex-start text-label-2 flex flex-col gap-2">
        받는 분과의 관계
        <button
          className="text-grey-700 placeholder:text-grey-400 border-grey-300 text-headline-3 w-80 border-b-1 border-solid px-1 text-left focus:ring-0 focus:outline-none"
          onClick={() => setIsModalOpen(true)}
        >
          {selected.relationship ? (
            <span>{selected.relationship}</span>
          ) : (
            <span className="text-grey-400">관계를 선택해주세요</span>
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
