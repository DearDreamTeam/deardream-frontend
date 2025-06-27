// app/page.tsx
"use client";

interface AddressInputProps {
  isInstitution?: boolean;
}

const AddressInput = ({ isInstitution }: AddressInputProps) => {
  return (
    <>
      <div className="flex w-full flex-col items-center gap-10 pt-10">
        {isInstitution && (
          <div className="flex-start relative flex flex-col gap-2 text-sm font-normal text-zinc-900">
            기관 코드
            <input
              type="text"
              readOnly
              className="text-medium w-80 border-b-1 border-solid border-[#EBEBF0] px-1 py-2 text-xl font-medium text-gray-700 placeholder:text-gray-400 focus:ring-0 focus:outline-none"
              placeholder="코드를 생성해주세요"
            />
            <button className="absolute right-0 bottom-0 m-2 inline-flex h-8 items-center justify-center rounded bg-gray-500 px-4 text-white">
              기관 코드 생성
            </button>
          </div>
        )}
        <div className="flex-start flex flex-col gap-2 text-sm font-normal text-zinc-900">
          우편 번호
          <input
            type="text"
            className="text-medium w-80 border-b-1 border-solid border-[#EBEBF0] px-1 py-2 text-xl font-medium text-gray-700 placeholder:text-gray-400 focus:ring-0 focus:outline-none"
            placeholder="우편 번호를 입력해주세요"
          />
        </div>

        <div className="flex-start flex flex-col gap-2 text-sm font-normal text-zinc-900">
          도로명 주소
          <input
            type="text"
            className="text-medium w-80 border-b-1 border-solid border-[#EBEBF0] px-1 py-2 text-xl font-medium text-gray-700 placeholder:text-gray-400 focus:ring-0 focus:outline-none"
            placeholder="도로명 주소를 입력해주세요"
          />
        </div>

        <div className="flex-start flex flex-col gap-2 text-sm font-normal text-zinc-900">
          상세주소
          <input
            type="text"
            className="text-medium w-80 border-b-1 border-solid border-[#EBEBF0] px-1 py-2 text-xl font-medium text-gray-700 placeholder:text-gray-400 focus:ring-0 focus:outline-none"
            placeholder="건물, 동호수 등"
          />
        </div>
      </div>
    </>
  );
};
export default AddressInput;
