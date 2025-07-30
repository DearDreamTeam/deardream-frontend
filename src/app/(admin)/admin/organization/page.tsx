"use client";

import { useOrganAdminStore } from "@/stores/admin/useOrganizationAdminStore";
import { TableHeader } from "../_components/table/table-header";
import { InstitutionFamilyTableItem } from "../_components/table/table-item";
import ItemCount from "../_components/table/item-count";
import { useRef, useState } from "react";
import ArrowBack from "@/public/icons/common/arrow_back_ios.svg";
import ArrowFront from "@/public/icons/common/arrow_front_ios.svg";
import { DeliveryStatus } from "../_components/deliveryStatus/delivery-status";
import { INSTITUTION_FAMILY_TABLE_ITEMS } from "../_components/table/table-items";
import MoreView from "../_components/button/more-view";

const Page = () => {
  const { organizationInfo, families } = useOrganAdminStore();
  const [pivotDate, setPivotDate] = useState(new Date());
  const [viewLevel, setViewLevel] = useState(1);
  const monthRef = useRef<HTMLInputElement>(null);
  const handleDeleteMember = (familyId: number) => {
    console.log(familyId);
  };
  const maxMem = 30;
  const curMem = 28;
  const viewFam = families.slice(0, viewLevel * 8);
  return (
    <div className="px-10 pb-8">
      {/* <section className="text-body-1">
        <div className="flex-row-gap-1 organization-info">
          <span>기관코드</span>
          <span>OEPC12</span>
        </div>
        <div className="flex-row-gap-1 organization-info">
          <span>주소</span>
          <span>({organizationInfo.postalCode})</span>
          <span>{organizationInfo.address}</span>
        </div>
        <div className="flex-row-gap-1 organization-info">
          <span>전화번호</span>
          <span>{organizationInfo.phone}</span>
        </div>
      </section> */}
      <section className="flex w-full flex-col items-center justify-center pt-8">
        <div className="text-headline-0 text-grey-700 flex gap-4">
          <button
          // onClick={() =>
          //   setPivotDate(
          //     new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1, 1),
          //   )
          // }
          >
            <ArrowBack />
          </button>
          <button onClick={() => monthRef.current?.showPicker()}>
            {pivotDate.getFullYear()}년 {6}월
          </button>
          <button
          // onClick={() =>
          //   setPivotDate(
          //     new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 1),
          //   )
          // }
          >
            <ArrowFront />
          </button>
        </div>

        <input
          ref={monthRef}
          type="month"
          value={`${pivotDate.getFullYear()}-${String(pivotDate.getMonth() + 1).padStart(2, "0")}`}
          onChange={(e) => setPivotDate(new Date(e.target.value))}
          className="opacity-0"
        />
      </section>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ItemCount count={families.length} />
          <span>{DeliveryStatus(organizationInfo.deliveryStatus)}</span>
        </div>

        <div className="text-title-2 text-grey-600 flex gap-4">
          <div className="flex gap-4">
            <span>등록인원</span>
            <span>{curMem} 명</span>
          </div>
          <span>/</span>
          <div className="flex gap-4">
            <span>구매인원</span>
            <span>{maxMem} 명</span>
          </div>
        </div>
      </div>

      <TableHeader
        items={INSTITUTION_FAMILY_TABLE_ITEMS}
        keyPrefix={"inst-f"}
        className="break-keep"
      />
      {viewFam.map((item, index) => (
        <InstitutionFamilyTableItem
          key={"inst-td" + index}
          index={index + 1}
          {...item}
          handleDeleteMember={handleDeleteMember}
        />
      ))}
      <MoreView
        viewLevel={viewLevel}
        count={curMem}
        onClick={() => setViewLevel((prev) => prev + 1)}
      />
    </div>
  );
};

export default Page;
