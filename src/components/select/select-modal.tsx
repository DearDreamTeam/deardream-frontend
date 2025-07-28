import { useState } from "react";
import Picker from "react-mobile-picker";
import { FAMILY_RELATION } from "@/constants/family-relation";

const relationshipOptions = Object.values(FAMILY_RELATION);
interface SelectModalProps {
  selected: { relationship: string };
  setSelected: (value: { relationship: string }) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}
const SelectModal = ({
  selected,
  setSelected,
  setIsModalOpen,
}: SelectModalProps) => {
  const [select, setSelect] = useState<{ relationship: string }>({
    relationship:
      FAMILY_RELATION[selected.relationship as keyof typeof FAMILY_RELATION] ??
      relationshipOptions[0],
  });
  const handleSelect = (value: string) => {
    const formattedValue = Object.keys(FAMILY_RELATION).find(
      (key) => FAMILY_RELATION[key as keyof typeof FAMILY_RELATION] === value,
    ) as keyof typeof FAMILY_RELATION;

    if (!formattedValue) {
      console.warn("Invalid family relationship selected:", value);
      return;
    }
    console.log(value);
    setSelect({ relationship: value }); // 한국어 유지 (뷰용)
    setSelected({ relationship: formattedValue }); // 서버용 값으로 변환해서 상위 컴포넌트에 전달
  };
  return (
    <div
      className="fixed inset-0 z-50 flex touch-pan-y items-end justify-center overflow-hidden bg-black/40"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="bg-grey-0 flex w-full max-w-[768px] flex-col items-center justify-center gap-4 rounded-t-3xl p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-headline-3 w-full">받는 분과의 관계</div>
        <Picker
          value={select}
          onChange={setSelect}
          wheelMode="natural"
          className="w-[80%]"
        >
          <Picker.Column name="relationship" className="z-100">
            {relationshipOptions.map((option) => (
              <Picker.Item key={option} value={option} className="border-none">
                {({ selected }) => (
                  <div
                    className={`h-full w-full py-1.5 text-center text-xl ${
                      selected
                        ? "text-headline-3 text-grey-700"
                        : "text-grey-400"
                    }`}
                  >
                    {option}
                  </div>
                )}
              </Picker.Item>
            ))}
          </Picker.Column>
        </Picker>
        <div className="flex w-full justify-center gap-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="text-grey-700 shadow-default text-label-2 bg-grey-0 w-36 rounded-lg p-4"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => {
              handleSelect(select.relationship);
              setIsModalOpen(false);
            }}
            className="text-label-2 text-grey-0 w-36 rounded-lg bg-green-300 p-4 text-center"
          >
            선택
          </button>
        </div>
      </div>
    </div>
  );
};
export default SelectModal;
