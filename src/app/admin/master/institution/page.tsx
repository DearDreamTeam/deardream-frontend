"use client";
import { useSuperAdminStore } from "@/stores/admin/useSuperAdminStroe";
import { useState } from "react";
import ItemCount from "../../_components/table/item-count";
import ChangeStatus from "../../_components/button/change-status";
import { TableHeader } from "../../_components/table/table-header";
import { InstitutionTableItem } from "../../_components/table/table-item";
import MoreView from "../../_components/button/more-view";
import { DELIVERY_TYPE } from "@/constants/delivery-type";
import PageToggle from "../../_components/button/page-toggle";
import { INSTITUTIONS_TABLE_ITEMS } from "../../_components/table/table-items";
import MonthPicker from "../../_components/month-picker";
import InstitutionDetail from "../../_components/viewer/institution-detail";
import { mockFam } from "@/stores/admin/useOrganizationAdminStore";

const Page = () => {
  const [checkedItem, setCheckedItem] = useState<number[]>([]);
  const { institutions } = useSuperAdminStore();
  const [selectedInstitution, setSelecedInstitution] = useState<null | number>(
    null,
  );

  const handleCheckboxChange = (institutionId: number, checked: boolean) => {
    if (checked) setCheckedItem((prev) => [...prev, institutionId]);
    else
      setCheckedItem((prev) =>
        prev.filter((selectedId) => selectedId !== institutionId),
      );
  };

  return (
    <div className="bg-grey-0 w-full">
      <PageToggle curPage={DELIVERY_TYPE.INSTITUTION} />
      <MonthPicker />
      <div className="flex justify-between">
        <ItemCount count={institutions.length} />

        <div className="flex items-center gap-4">
          <ChangeStatus selectedItemCount={checkedItem.length} />
        </div>
      </div>
      <TableHeader
        items={INSTITUTIONS_TABLE_ITEMS}
        keyPrefix={"inst-th"}
        gap="gap-2"
      />
      {institutions.map((item, index) => (
        <InstitutionTableItem
          key={index}
          index={index + 1}
          {...item}
          handleCheckboxChange={handleCheckboxChange}
          isSelected={selectedInstitution === item.institutionId}
          onClick={() => setSelecedInstitution(item.institutionId)}
        />
      ))}
      <MoreView viewLevel={1} count={institutions.length} />

      <ItemCount count={mockFam.length} />
      {selectedInstitution && <InstitutionDetail families={mockFam} />}
    </div>
  );
};

export default Page;
