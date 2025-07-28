import Header from "@/components/common/header";
import Light from "/public/icons/common/light.svg";

const GuideLetterPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center p-4 pt-0">
      <Header>이어드림 가이드</Header>
      <div className="flex w-full flex-col items-center py-6">
        <div className="text-headline-0 text-grey-900 py-2 leading-10">
          소식 작성 가이드
        </div>
        <div className="text-label-1 text-grey-500 leading-normal">
          어떤 소식을 남겨야 하나요?
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-title-1 text-grey-800 w-full py-5 text-left leading-normal">
            가볍게, 편하게 일상 이야기를 나누듯 남겨보세요
          </div>
          <div className="text-grey-700 flex w-full flex-col gap-2 text-left">
            <div>꼭 특별한 일이 아니어도 괜찮아요.</div>
            <div className="leading-tight">
              오늘 먹은 음식, 손주가 그린 그림, 산책 중 찍은 사진처럼 <br />
              소소한 일상도 어르신께는 소중한 소식이 될 수 있어요.
            </div>
            <div className="text-grey-500 text-caption-2 flex items-center leading-none">
              <Light />
              &quot;잘 지내고 있어요!&quot; 같은 짧은 한마디도 충분해요.
            </div>
          </div>
        </div>
        <div>
          <div className="text-title-1 text-grey-800 w-full py-5 text-left leading-normal">
            큰 글자 인쇄를 위해, 글자수 제한이 있어요
          </div>
          <div className="text-grey-700 flex w-full flex-col gap-2 text-left">
            <div>사진과 함께 남기는 경우, 최대 200자까지 작성 가능해요.</div>
            <div>사진 없이 글만 남길 경우, 최대 600자까지 작성 가능해요.</div>
            <div className="text-grey-500 text-caption-2 flex items-center leading-none">
              <Light />
              사진과 함께 짧게, 긴 글로 자세히 소식을 남겨보세요!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideLetterPage;
