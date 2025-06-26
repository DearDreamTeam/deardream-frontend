// app/page.tsx
"use client";

const RecieverProfile = () => {
  return (
    <>
      <div className="flex-start flex flex-col gap-2 text-sm font-normal text-zinc-900">
        전화번호
        <input
          type="text"
          name="phone"
          id="phone"
          className="text-medium w-80 border-b-1 border-solid border-[#EBEBF0] px-1 py-2 text-xl font-medium text-gray-700 placeholder:text-gray-400 focus:ring-0 focus:outline-none"
          placeholder="전화번호를 - 없이 입력해주세요"
        />
      </div>
    </>
  );
};
export default RecieverProfile;
