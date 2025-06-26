import GrayBasicButton from "@/components/button/gray-basic-button";
import RedBasicButton from "@/components/button/red-basic-button";
import Header from "@/components/common/header";
// import Bell from "@/public/icons/common/bell.svg";

const SettingPage = () => {
  return (
    <>
      <Header>주소 및 수령 방식</Header>
      <div className="relative mt-20 flex h-full w-full justify-center">
        <div className="flex w-96 flex-col gap-6 p-4">
          <div>
            <p className="text-center text-xl font-semibold text-neutral-900">
              [가정 수령 플랜 -<span className="text-rose-500">월 8,900원</span>
              ] 이용중
            </p>
          </div>

          <div className="rounded bg-blue-50 p-4">
            <p className="text-center text-base leading-normal text-zinc-600">
              주소를 변경하거나,
              <br />
              무료인 기관 수령 플랜으로 전환할 수 있어요.
            </p>
          </div>
        </div>
        <div className="absolute bottom-40 flex w-96 flex-col gap-4 rounded-[5px] bg-white p-4">
          <GrayBasicButton>기관에서 받고 싶어요(무료)</GrayBasicButton>
          <RedBasicButton>주소를 바꾸고 싶어요</RedBasicButton>
        </div>
      </div>
    </>
  );
};
export default SettingPage;
