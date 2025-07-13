// app/page.tsx
"use client";

// interface AddressInputProps {
//   isInstitution?: boolean;
// }

const InstitutionAddressInput = () => {
  return (
    <>
      <div className="flex w-full flex-col items-center gap-10 pt-10">
        <div className="flex-start text-grey-700 text-label-2 relative flex flex-col gap-2">
          기관 코드
          <input
            type="text"
            readOnly
            className="text-medium text-grey-700 placeholder:text-grey-400 border-grey-300 w-80 border-b-1 border-solid px-1 py-2 text-xl font-medium focus:ring-0 focus:outline-none"
            placeholder="코드를 입력해주세요"
          />
          <button className="absolute right-0 bottom-0 m-2 inline-flex h-8 items-center justify-center rounded bg-green-100 px-4 text-green-300">
            기관 코드 생성
          </button>
        </div>

        <div className="flex-start text-grey-700 text-label-2 flex flex-col gap-2">
          우편 번호
          <input
            type="text"
            className="text-grey-700 placeholder:text-grey-400 border-grey-300 text-headline-3 w-80 border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
            placeholder="우편 번호를 입력해주세요"
          />
        </div>

        <div className="flex-start text-grey-700 text-label-2 flex flex-col gap-2">
          도로명 주소
          <input
            type="text"
            className="text-grey-700 placeholder:text-grey-400 border-grey-300 text-headline-3 w-80 border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
            placeholder="도로명 주소를 입력해주세요"
          />
        </div>

        <div className="flex-start text-grey-700 text-label-2 flex flex-col gap-2">
          상세주소
          <input
            type="text"
            className="text-grey-700 placeholder:text-grey-400 border-grey-300 text-headline-3 w-80 border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
            placeholder="건물, 동호수 등"
          />
        </div>
      </div>
    </>
  );
};
export default InstitutionAddressInput;
