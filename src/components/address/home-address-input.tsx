"use client";

import { useReceiverStore } from "@/stores/useReceiverStore";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Address } from "react-daum-postcode";

// SSR 방지
const DaumPostcodeEmbed = dynamic(() => import("react-daum-postcode"), {
  ssr: false,
});

interface HomeAddressInputProps {
  code: string;
  name: string;
  address: string;
  phone: string;
  postalCode: string;
}

const HomeAddressInput = () => {
  const [institution, setInstitution] = useState<HomeAddressInputProps>({
    code: "",
    name: "",
    address: "",
    phone: "",
    postalCode: "",
  });
  const { receiver, setReceiver } = useReceiverStore();
  const [detailAddress, setDetailAddress] = useState("");
  const [showPostcode, setShowPostcode] = useState(false);

  const handleDetailAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDetailAddress(e.target.value);
    setReceiver({
      address: {
        ...receiver.address,
        addressDetail: e.target.value,
        deliveryType: "HOME",
      },
    });
  };

  const handleAddressComplete = (data: Address) => {
    const { address, zonecode } = data;

    const updatedInstitution = {
      ...institution,
      address,
      postalCode: zonecode,
    };

    setInstitution(updatedInstitution);

    setReceiver({
      address: {
        ...receiver.address,
        address,
        postalCode: zonecode,
        deliveryType: "HOME",
      },
    });

    setShowPostcode(false);
  };

  return (
    <>
      <div className="flex w-full flex-col items-center gap-10">
        <div className="flex-start text-grey-700 text-label-2 relative flex flex-col gap-2">
          우편 번호
          <div className="flex w-80 flex-row items-center justify-between">
            <input
              type="text"
              className="text-headline-3 text-grey-700 placeholder:text-grey-400 border-grey-300 w-45 border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
              placeholder="우편 번호"
              value={institution.postalCode || receiver?.address.postalCode}
              readOnly
            />
            <button
              className="inline-flex items-center justify-center rounded bg-green-100 px-4 py-2 whitespace-nowrap text-green-300"
              onClick={() => setShowPostcode(true)}
            >
              우편 번호 찾기
            </button>
          </div>
        </div>

        {showPostcode && (
          <div className="z-10 w-80 border">
            <DaumPostcodeEmbed onComplete={handleAddressComplete} />
          </div>
        )}

        <div className="flex-start text-grey-700 text-label-2 flex flex-col gap-2">
          주소
          <input
            type="text"
            className="text-grey-700 placeholder:text-grey-400 border-grey-300 text-headline-3 w-80 border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
            value={institution.address || receiver?.address.address}
            readOnly
          />
        </div>
        <div className="flex-start text-grey-700 text-label-2 flex flex-col gap-2">
          상세 주소
          <input
            type="text"
            className="text-grey-700 placeholder:text-grey-400 border-grey-300 text-headline-3 w-80 border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
            placeholder="상세 주소를 입력해주세요(선택)"
            value={detailAddress || receiver?.address.addressDetail}
            onChange={handleDetailAddressChange}
          />
        </div>

        <div className="flex-start text-grey-700 text-label-2 flex flex-col gap-2">
          수령인
          <input
            type="text"
            className="text-grey-700 placeholder:text-grey-400 border-grey-300 text-headline-3 w-80 border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
            value={institution.name || receiver?.address.institutionName}
          />
        </div>

        <div className="flex-start text-grey-700 text-label-2 flex flex-col gap-2">
          수령인 전화번호
          <input
            type="text"
            className="text-grey-700 placeholder:text-grey-400 border-grey-300 text-headline-3 w-80 border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
            value={institution.phone || receiver?.address.institutionPhone}
          />
        </div>
      </div>
    </>
  );
};
export default HomeAddressInput;
