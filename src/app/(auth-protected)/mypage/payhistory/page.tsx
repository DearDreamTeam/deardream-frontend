"use client";

import Header from "@/components/common/header";
import Loading from "@/components/loading-fallback/loading";
import axios from "@/lib/axios";
import { useUserStore } from "@/stores/useUserInfoStore";
import { useEffect, useState } from "react";

interface PayHistory {
  paymentDate: string;
  amount: number;
}

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
  const [payHistory, setPayHistory] = useState<PayHistory[]>([]);
  const { userProfile } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPayHistory = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/v1/test/payment/request", {
          params: {
            familyId: userProfile.id,
          },
        });
        setPayHistory(response.data.result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPayHistory();
  }, [userProfile.id]);
  return (
    <>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="bg-grey-0 flex h-full w-full flex-col items-center p-3 pt-0">
          <Header>결제 내역</Header>

          {payHistory.length === 0 ? (
            <div className="mt-auto mb-auto flex w-full items-center justify-center">
              결제 내역이 없습니다
            </div>
          ) : (
            payHistory.map((item) => (
              <div
                key={item.paymentDate}
                className="mt-4 flex w-full flex-col gap-8"
              >
                <div className="flex w-full flex-col gap-4">
                  <PayItem date={new Date(item.paymentDate)} />
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};
export default PayHistoryPage;
