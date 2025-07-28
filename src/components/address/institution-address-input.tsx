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
      setReceiver({
        address: {
          ...receiver.address,
          code: "",
          address: "",
          postalCode: "",
          institutionName: "",
          institutionPhone: "",
        },
      });
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
      <div className="flex w-full flex-col items-center gap-4">
        <div className="flex-start text-body-1 text-grey-400 relative flex max-w-90 min-w-80 flex-col gap-2">
          기관 코드
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <input
              type="text"
              className="text-title-1 text-grey-900 placeholder:text-title-3 placeholder:text-grey-400 border-grey-300 w-full border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
              placeholder="기관 코드를 입력해주세요"
              value={code || receiver?.address.code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              type="button"
              onClick={handleCodeCheck}
              className="inline-flex items-center justify-center rounded-sm bg-green-100 px-4 py-2 whitespace-nowrap text-green-300"
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

        <div className="flex-start text-body-1 text-grey-400 flex max-w-90 min-w-80 flex-col gap-2">
          우편 번호
          <input
            type="text"
            className="text-grey-900 placeholder:text-title-3 placeholder:text-grey-400 border-grey-300 text-title-1 w-full border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
            value={institution.postalCode || receiver?.address.postalCode}
            placeholder="우편 번호"
            readOnly
          />
        </div>
        <div className="flex-start text-body-1 text-grey-400 flex max-w-90 min-w-80 flex-col gap-2">
          주소
          <input
            type="text"
            className="text-grey-900 placeholder:text-title-3 border-grey-300 placeholder:text-grey-400 text-title-1 w-full border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
            value={institution.address || receiver?.address.address}
            placeholder="주소"
            readOnly
          />
        </div>
        <div className="flex-start text-body-1 text-grey-400 flex max-w-90 min-w-80 flex-col gap-2">
          상세 주소
          <input
            type="text"
            className="text-grey-900 placeholder:text-title-3 border-grey-300 text-title-1 placeholder:text-grey-400 w-full border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
            placeholder="상세 주소를 입력해주세요 (선택)"
            value={detailAddress || receiver?.address.addressDetail}
            onChange={handleDetailAddressChange}
          />
        </div>

        <div className="flex-start text-body-1 text-grey-400 flex max-w-90 min-w-80 flex-col gap-2">
          기관명
          <input
            type="text"
            className="text-grey-900 placeholder:text-title-3 border-grey-300 placeholder:text-grey-400 text-title-1 w-full border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
            value={institution.name || receiver?.address.institutionName}
            placeholder="기관명"
            readOnly
          />
        </div>

        <div className="flex-start text-body-1 text-grey-400 flex max-w-90 min-w-80 flex-col gap-2">
          기관 전화번호
          <input
            type="text"
            className="text-grey-900 placeholder:text-title-3 border-grey-300 placeholder:text-grey-400 text-title-1 w-full border-b-1 border-solid px-1 py-2 focus:ring-0 focus:outline-none"
            value={institution.phone || receiver?.address.institutionPhone}
            placeholder="기관 전화번호"
            readOnly
          />
        </div>
      </div>
    </>
  );
};
export default InstitutionAddressInput;
