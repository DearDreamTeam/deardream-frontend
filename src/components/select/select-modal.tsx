import { useState } from "react";
import Picker from "react-mobile-picker";
const relationshipOptions = [
  "부모님",
  "형제/자매",
  "조부모님",
  "친척",
  "친구",
  "배우자",
  "자녀",
  "기타",
];
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
  const [select, setSelect] = useState({
    relationship: selected.relationship || relationshipOptions[0],
  });
  const handleSelect = (value: string) => {
    setSelect({ ...select, relationship: value });
    setSelected({ relationship: value });
    setIsModalOpen(false);
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
                      selected ? "text-headline-3" : "text-grey-400"
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
            onClick={() => setIsModalOpen(false)}
            className="text-grey-700 shadow-default text-label-2 bg-grey-0 w-36 rounded-lg rounded-md p-4"
          >
            취소
          </button>
          <button
            onClick={() => {
              handleSelect(select.relationship);
              setIsModalOpen(false);
            }}
            className="text-label-2 text-grey-0 w-36 rounded-md bg-green-300 p-4 text-center"
          >
            선택
          </button>
        </div>
      </div>
    </div>
  );
};
export default SelectModal;
