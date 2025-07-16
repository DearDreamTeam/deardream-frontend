// app/page.tsx
"use client";
import axios from "@/lib/axios";
import { useReceiverStore } from "@/stores/useReceiverStore";
import { useState } from "react";

// interface AddressInputProps {
//   isInstitution?: boolean;
// }

interface InstitutionAddressInputProps {
  code: string;
  name: string;
  address: string;
  phone: string;
  postalCode: string;
}

const InstitutionAddressInput = () => {
  const [message, setMessage] = useState<number>(-1);
  const [code, setCode] = useState("");
  const [institution, setInstitution] = useState<InstitutionAddressInputProps>({
    code: "",
    name: "",
    address: "",
    phone: "",
    postalCode: "",
  });
  const { receiver, setReceiver } = useReceiverStore();
  const [detailAddress, setDetailAddress] = useState("");

  const handleCodeCheck = async () => {
    try {
      const response = await axios.get("/v1/institutions", {
        params: { code },
      });
      setInstitution(response.data.result);
      setMessage(1); // 성공 메시지
      setReceiver({
        address: {
          ...receiver.address, // 기존 값 보존 (필요시)
          code: response.data.result.code,
          address: response.data.result.address,
          postalCode: response.data.result.postalCode,
          institutionName: response.data.result.name,
          institutionPhone: response.data.result.phone,
        },
      });
    } catch (error) {
      setMessage(0); // 실패 메시지
      console.error("기관 코드가 유효하지 않습니다.", error);
      setInstitution({
        code: "",
        name: "",
        address: "",
        phone: "",
        postalCode: "",
      }); // 실패 시 초기화
    }
  };
  const handleDetailAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDetailAddress(e.target.value);
    setReceiver({
      address: {
        ...receiver.address,
        addressDetail: e.target.value,
        deliveryType: "INSTITUTION",
      },
    });
  };

  return (
    <>
      <div className="flex w-full flex-col items-center gap-10">
        <div className="flex-start text-grey-700 text-label-2 relative flex flex-col gap-2">
          기관 코드
          <div className="relative w-80">
            <input
              type="text"
              className="text-medium text-grey-700 placeholder:text-grey-400 border-grey-300 w-80 border-b-1 border-solid px-1 py-2 text-xl font-medium focus:ring-0 focus:outline-none"
              placeholder="코드를 입력해주세요"
              value={receiver?.address.code || code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              onClick={handleCodeCheck}
              className="absolute right-0 bottom-0 m-2 inline-flex h-8 items-center justify-center rounded bg-green-100 px-4 text-green-300"
            >
              기관 코드 확인
            </button>
          </div>
          {(message == 1 && (
            <div className="text-sm text-green-300">
              유효한 기관 코드입니다.
            </div>
          )) ||
            (message == 0 && (
              <div className="text-sm text-red-500">
                기관 코드가 유효하지 않습니다.
              </div>
            ))}
        </div>

        <div className="flex-start text-grey-700 text-label-2 flex flex-col gap-2">
          우편 번호
          <input
            type="text"
            className="text-grey-700 placeholder:text-grey-400 border-grey-300 text-headline-3 w-80 border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
            value={institution.postalCode || receiver?.address.postalCode}
            readOnly
          />
        </div>
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
          기관명
          <input
            type="text"
            className="text-grey-700 placeholder:text-grey-400 border-grey-300 text-headline-3 w-80 border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
            value={institution.name || receiver?.address.institutionName}
            readOnly
          />
        </div>

        <div className="flex-start text-grey-700 text-label-2 flex flex-col gap-2">
          기관 전화번호
          <input
            type="text"
            className="text-grey-700 placeholder:text-grey-400 border-grey-300 text-headline-3 w-80 border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
            value={institution.phone || receiver?.address.institutionPhone}
            readOnly
          />
        </div>
      </div>
    </>
  );
};
export default InstitutionAddressInput;
