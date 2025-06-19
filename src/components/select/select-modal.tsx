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
  return (
    <div
      className="fixed inset-0 z-50 flex touch-pan-y items-end justify-center overflow-hidden bg-black/40"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="flex w-full flex-col items-center justify-center gap-4 rounded-t-3xl bg-white p-8 shadow-lg md:max-w-[375px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full text-2xl font-semibold text-black">
          받는 분과의 관계
        </div>
        <Picker
          value={selected}
          onChange={setSelected}
          wheelMode="natural"
          className="w-[80%]"
        >
          <Picker.Column name="relationship" className="z-100">
            {relationshipOptions.map((option) => (
              <Picker.Item key={option} value={option} className="border-none">
                {({ selected }) => (
                  <div
                    className={`h-full w-full p-1.5 text-center text-xl ${
                      selected ? "font-medium text-black" : "text-gray-400"
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
            className="w-36 rounded-lg rounded-md bg-white p-4 text-center text-sm font-normal text-gray-700 shadow-[0px_0px_8px_0px_rgba(0,0,0,0.15)]"
          >
            취소
          </button>
          <button className="w-36 rounded-md bg-[#f03f65] p-4 text-center text-sm font-normal text-white">
            선택
          </button>
        </div>
      </div>
    </div>
  );
};
export default SelectModal;
