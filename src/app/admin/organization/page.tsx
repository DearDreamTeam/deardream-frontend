"use client";

import { useOrganAdminStore } from "@/stores/admin/useOrganizationAdminStore";
import { InstitutionFamilyTableHeader } from "../_components/table/table-header";
import { InstitutionFamilyTableItem } from "../_components/table/table-item";
import ItemCount from "../_components/table/item-count";
import { useRef, useState } from "react";
import ArrowBack from "@/public/icons/common/arrow_back_ios.svg";
import ArrowFront from "@/public/icons/common/arrow_front_ios.svg";
import { DeliveryStatus } from "../_components/deliveryStatus/delivery-status";

const Page = () => {
  const { organizationInfo, families } = useOrganAdminStore();
  const [pivotDate, setPivotDate] = useState(new Date());
  const monthRef = useRef<HTMLInputElement>(null);
  const handleDeleteMember = (familyId: number) => {
    console.log(familyId);
  };
  return (
    <div>
      <section className="text-body-1">
        <span className="text-title-1">
          안녕하세요. 이어드림의 기관 어드민 페이지에 오신 것을 환영합니다.
        </span>
        <h1 className="text-headline-0">
          {organizationInfo.institutionName} 관계자님
        </h1>
        <div>기관 코드: {organizationInfo.institutionCode}</div>
        <div>
          주소: ({organizationInfo.postalCode}) {organizationInfo.address}
        </div>
        <div>전화 번호: {organizationInfo.phone}</div>
      </section>
      <section className="flex w-full flex-col items-center justify-center">
        <div className="text-headline-0 text-grey-700 flex gap-4">
          <button
            onClick={() =>
              setPivotDate(
                new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1, 1),
              )
            }
          >
            <ArrowBack />
          </button>
          <button onClick={() => monthRef.current?.showPicker()}>
            {pivotDate.getFullYear()}년 {pivotDate.getMonth() + 1}월
          </button>
          <button
            onClick={() =>
              setPivotDate(
                new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 1),
              )
            }
          >
            <ArrowFront />
          </button>
        </div>
        <span>{DeliveryStatus(organizationInfo.deliveryStatus)}</span>

        <input
          ref={monthRef}
          type="month"
          value={`${pivotDate.getFullYear()}-${String(pivotDate.getMonth() + 1).padStart(2, "0")}`}
          onChange={(e) => setPivotDate(new Date(e.target.value))}
          className="opacity-0"
        />
      </section>
      <ItemCount count={families.length} />
      <InstitutionFamilyTableHeader />
      {families.map((item, index) => (
        <InstitutionFamilyTableItem
          key={"inst-td" + index}
          index={index + 1}
          {...item}
          handleDeleteMember={handleDeleteMember}
        />
      ))}
    </div>
  );
};

export default Page;
