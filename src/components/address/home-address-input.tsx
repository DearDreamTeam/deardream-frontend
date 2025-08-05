"use client";

import { useReceiverStore } from "@/stores/useReceiverStore";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Address } from "react-daum-postcode";

// SSR 방지
const DaumPostcodeEmbed = dynamic(() => import("react-daum-postcode"), {
  ssr: false,
});

const HomeAddressInput = () => {
  const { receiver, setReceiver } = useReceiverStore();
  const [showPostcode, setShowPostcode] = useState(false);

  const formatPhoneNumber = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, ""); // 숫자만 남김

    if (onlyNumbers.length < 4) return onlyNumbers;
    if (onlyNumbers.length < 8)
      return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
    return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3, 7)}-${onlyNumbers.slice(7, 11)}`;
  };

  const handleAddressComplete = (data: Address) => {
    const { address, zonecode } = data;

    setReceiver({
      address: {
        ...receiver.address,
        address,
        postalCode: zonecode,
        deliveryType: "HOME",
        recipientName: receiver.name,
        recipientPhone: formatPhoneNumber(receiver.phone),
      },
    });

    setShowPostcode(false);
  };

  return (
    <>
      <div className="flex h-full w-full flex-col items-center gap-6">
        <div className="flex-start text-grey-400 text-body-1 relative flex w-full flex-col gap-2">
          우편 번호
          <div className="flex w-full flex-row items-center justify-between">
            <input
              type="text"
              className="text-grey-900 placeholder:text-grey-400 border-grey-300 placeholder:text-title-3 text-title-1 w-full border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
              placeholder="우편 번호(우편 번호 찾기 이용)"
              value={receiver?.address.postalCode || ""}
              readOnly
            />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-sm bg-green-100 px-4 py-2 whitespace-nowrap text-green-300"
              onClick={() => setShowPostcode(true)}
            >
              우편 번호 찾기
            </button>
          </div>
        </div>

        {showPostcode && (
          <div className="z-10 w-full border">
            <DaumPostcodeEmbed onComplete={handleAddressComplete} />
          </div>
        )}

        <div className="flex-start text-grey-400 text-body-1 flex w-full flex-col gap-2">
          주소
          <input
            type="text"
            className="text-grey-900 placeholder:text-grey-400 border-grey-300 placeholder:text-title-3 text-title-1 w-full border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
            value={receiver?.address.address || ""}
            placeholder="기관 건물, 지번 또는 도로명(우편 번호 입력시 자동 입력)"
            readOnly
          />
        </div>
        <div className="flex-start text-grey-400 text-body-1 flex w-full flex-col gap-2">
          상세 주소
          <input
            type="text"
            className="text-grey-900 placeholder:text-grey-400 border-grey-300 placeholder:text-title-3 text-title-1 w-full border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
            placeholder="상세 주소를 입력해주세요(선택)"
            value={receiver?.address.addressDetail || ""}
            onChange={(e) => {
              setReceiver({
                address: {
                  ...receiver.address,
                  addressDetail: e.target.value,
                },
              });
            }}
          />
        </div>

        <div className="flex-start text-grey-400 text-body-1 flex w-full flex-col gap-2">
          수령인
          <input
            type="text"
            className="text-grey-900 placeholder:text-grey-400 border-grey-300 placeholder:text-title-3 text-title-1 w-full border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
            value={receiver.name}
            placeholder="수령인 성함을 입력해주세요"
            readOnly
          />
        </div>

        <div className="flex-start text-grey-400 text-body-1 flex w-full flex-col gap-2">
          수령인 전화번호
          <input
            type="text"
            className="text-grey-900 placeholder:text-grey-400 border-grey-300 placeholder:text-title-3 text-title-1 w-full border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
            value={formatPhoneNumber(receiver.phone)}
            placeholder="수령인 전화번호를 입력해주세요"
            readOnly
          />
        </div>
      </div>
    </>
  );
};
export default HomeAddressInput;
