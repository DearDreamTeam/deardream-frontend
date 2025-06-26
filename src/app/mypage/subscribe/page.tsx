import Header from "@/components/common/header";
import RedSpan from "@/components/common/red-span";
import Bell from "@/public/icons/common/bell.svg";

const SubScribePage = () => {
  return (
    <>
      <Header>나의 정기구독</Header>
      <div className="mt-20 flex w-full justify-center">
        <div className="flex w-80 flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-xl font-semibold text-zinc-900">
                이어드림 종이 소식지 정기구독
              </h2>
              <RedSpan>활성화</RedSpan>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-sm text-zinc-600">
              <Bell />
              <span>다음 결제일은 2025년 7월 13일입니다.</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-lg font-semibold text-black">
              사용 중인 구독권
            </div>
            <div className="flex w-full flex-col gap-4 rounded bg-blue-50 p-4">
              <div className="flex justify-between text-base text-black">
                <span>구독 기간</span>
                <span>25.06.12. ~ 25.07.12.</span>
              </div>
              <div className="h-px w-full bg-gray-200" />

              <div className="flex justify-between text-base text-black">
                <span>결제 금액</span>
                <span className="text-zinc-900">월 8,900원</span>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-between rounded border border-gray-100 p-4 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.15)]">
            <span className="text-lg font-medium text-zinc-900">
              주소 및 수령 방식 변경
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default SubScribePage;
