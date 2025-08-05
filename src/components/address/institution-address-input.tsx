"use client";

import axios from "@/lib/axios";
import { useReceiverStore } from "@/stores/useReceiverStore";
import { useState, useEffect } from "react";

interface InstitutionAddressInputProps {
  deliveryType: "HOME" | "INSTITUTION" | "NONE";
  recipientName?: string;
  recipientPhone?: string;
  postalCode: string;
  address: string;
  addressDetail?: string;
  institutionName: string;
  institutionPhone: string;
  code: string;
}

const InstitutionAddressInput = () => {
  const [message, setMessage] = useState<number>(-1);

  const { receiver, setReceiver } = useReceiverStore();

  const [institution, setInstitution] =
    useState<InstitutionAddressInputProps | null>(receiver.address);
  const [code, setCode] = useState(receiver.address.code);
  const [detailAddress, setDetailAddress] = useState(
    receiver.address.addressDetail,
  );

  // 📌 이걸 AddressPage에서 submit 직전에 호출해야 함
  useEffect(() => {
    if (!institution) return;

    setReceiver({
      address: {
        deliveryType: "INSTITUTION",
        code: institution.code,
        address: institution.address,
        postalCode: institution.postalCode,
        institutionName: institution.institutionName,
        institutionPhone: institution.institutionPhone,
        addressDetail: detailAddress,
        recipientName: "",
        recipientPhone: "",
      },
    });
  }, [institution, detailAddress, setReceiver]);

  const handleCodeCheck = async () => {
    try {
      const res = await axios.get("/v1/institutions", {
        params: { code },
      });

      setInstitution((prev: InstitutionAddressInputProps | null) => {
        if (!prev) {
          // prev가 null이면, deliveryType 등 필수 필드를 기본값으로 설정
          return {
            deliveryType: "INSTITUTION",
            institutionName: res.data.result.name,
            institutionPhone: res.data.result.phone,
            address: res.data.result.address,
            postalCode: res.data.result.postalCode,
            code: code,
            recipientName: "",
            recipientPhone: "",
            addressDetail: "",
          };
        }
        // prev가 있으면 기존 값 유지하면서 새 값만 덮어쓰기
        return {
          ...prev,
          institutionName: res.data.result.name,
          institutionPhone: res.data.result.phone,
          address: res.data.result.address,
          postalCode: res.data.result.postalCode,
        };
      });
      setMessage(1);
    } catch (err) {
      console.error("기관 코드 확인 실패", err);
      setInstitution(null);
      setMessage(0);
    }
  };

  const getValue = (val?: string) => val ?? "";

  return (
    <div className="overflow-auto-hide-scroll flex w-full flex-col items-center gap-4">
      {/* 기관 코드 */}
      <div className="text-body-1 text-grey-400 flex w-full flex-col gap-2">
        기관 코드
        <div className="flex w-full items-center gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="기관 코드를 입력해주세요"
            className="text-title-1 text-grey-900 placeholder:text-title-3 placeholder:text-grey-400 border-grey-300 w-full border-b-1 border-solid px-1 py-2 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleCodeCheck}
            className="inline-flex items-center justify-center rounded-sm bg-green-100 px-4 py-2 whitespace-nowrap text-green-300"
          >
            기관 코드 확인
          </button>
        </div>
        {message === 1 && (
          <p className="text-sm text-green-300">유효한 기관 코드입니다.</p>
        )}
        {message === 0 && (
          <p className="text-sm text-red-500">기관 코드가 유효하지 않습니다.</p>
        )}
      </div>

      {/* 우편 번호 */}
      <div className="text-body-1 text-grey-400 flex w-full flex-col gap-2">
        우편 번호
        <input
          type="text"
          value={getValue(institution?.postalCode)}
          readOnly
          placeholder="우편 번호"
          className="text-title-1 text-grey-900 placeholder:text-title-3 placeholder:text-grey-400 border-grey-300 w-full border-b-1 border-solid px-1 py-2 focus:outline-none"
        />
      </div>

      {/* 주소 */}
      <div className="text-body-1 text-grey-400 flex w-full flex-col gap-2">
        주소
        <input
          type="text"
          value={getValue(institution?.address)}
          readOnly
          placeholder="주소"
          className="text-title-1 text-grey-900 placeholder:text-title-3 placeholder:text-grey-400 border-grey-300 w-full border-b-1 border-solid px-1 py-2 focus:outline-none"
        />
      </div>

      {/* 상세 주소 */}
      <div className="text-body-1 text-grey-400 flex w-full flex-col gap-2">
        상세 주소
        <input
          type="text"
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
          placeholder="상세 주소를 입력해주세요 (선택)"
          className="text-title-1 text-grey-900 placeholder:text-title-3 placeholder:text-grey-400 border-grey-300 w-full border-b-1 border-solid px-1 py-2 focus:outline-none"
        />
      </div>

      {/* 기관명 */}
      <div className="text-body-1 text-grey-400 flex w-full flex-col gap-2">
        기관명
        <input
          type="text"
          value={getValue(institution?.institutionName)}
          readOnly
          placeholder="기관명"
          className="text-title-1 text-grey-900 placeholder:text-title-3 placeholder:text-grey-400 border-grey-300 w-full border-b-1 border-solid px-1 py-2 focus:outline-none"
        />
      </div>

      {/* 기관 전화번호 */}
      <div className="text-body-1 text-grey-400 flex w-full flex-col gap-2">
        기관 전화번호
        <input
          type="text"
          value={getValue(institution?.institutionPhone)}
          readOnly
          placeholder="기관 전화번호"
          className="text-title-1 text-grey-900 placeholder:text-title-3 placeholder:text-grey-400 border-grey-300 w-full border-b-1 border-solid px-1 py-2 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default InstitutionAddressInput;
