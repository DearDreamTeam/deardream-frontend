import Header from "@/components/common/header";
import Light from "/public/icons/common/light.svg";

const GuideLetterPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center p-4 pt-0">
      <Header>이어드림 가이드</Header>
      <div className="flex w-full flex-col items-center py-6">
        <div className="text-headline-0 text-grey-900 py-2 leading-10">
          소식 작성 마감 가이드
        </div>
        <div className="text-label-1 text-grey-500 leading-normal">
          언제까지 작성해야 하나요?
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-title-1 text-grey-800 w-full py-5 text-left leading-normal">
            매월 말일까지 작성된 소식이 해당 월호로 제작돼요
          </div>
          <div className="text-grey-700 flex w-full flex-col gap-2 text-left">
            <div>
              예를 들어, 4월 30일(화)까지 작성한 내용은 4월호 소식지로 어르신께
              전달돼요.
            </div>
            <div className="leading-tight">
              소식 작성 마감일 이후에 작성된 소식은 다음 달 소식지에 반영돼요.
            </div>
            <div className="text-grey-500 text-caption-2 flex leading-none">
              <Light />
              소식지 마감일은 매달 말일이며, 마감 시간이 지나면 그 달 소식지로는{" "}
              포함되지 않아요!
            </div>
          </div>
        </div>
        <div>
          <div className="text-title-1 text-grey-800 w-full py-5 text-left leading-normal">
            지난 달 소식은 따로 정리해둘게요
          </div>
          <div className="text-grey-700 flex w-full flex-col gap-2 text-left">
            <div>매월 1일에 홈 화면이 새롭게 초기화돼요.</div>
            <div>
              홈 화면에 적힌 문구가 바뀌더라도, 소식지 제작이 완료되면
              ‘소식함’에서 언제든 확인 가능해요.
            </div>
            <div className="text-grey-500 text-caption-2 flex leading-none">
              <Light />
              홈 화면은 ‘작성하는 공간’, 소식함은 ‘완성된 기록 공간’이라고
              <br />
              기억해 주세요!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideLetterPage;
