"use client";

import Header from "@/components/common/header";

const PayItem = ({ date }: { date: Date }) => {
  return (
    <>
      <div>
        <div className="text-body-2 text-grey-500 p-2">
          {date.toLocaleDateString()}
        </div>
        <div className="bg-grey-100 text-grey-800 flex items-center justify-between rounded-lg p-5">
          결제 완료
          <span className="text-title-2">8,900원</span>
        </div>
        <div className="text-grey-600 flex items-center justify-between p-5">
          개인 플랜 구독권
          <span>8,900원</span>
        </div>
      </div>
      <div className="border-grey-200 border-b" />
    </>
  );
};

const PayHistoryPage = () => {
  return (
    <>
      <div className="bg-grey-0 flex h-screen w-full flex-col items-center p-3 pt-0">
        <Header>결제 내역</Header>

        <div className="mt-4 flex w-full flex-col gap-8">
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col gap-2">
              <PayItem date={new Date()} />
              <PayItem date={new Date()} />
              <PayItem date={new Date()} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PayHistoryPage;
