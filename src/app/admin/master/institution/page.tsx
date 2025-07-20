"use client";
import { useSuperAdminStore } from "@/stores/admin/useSuperAdminStroe";
import { useState } from "react";
import ItemCount from "../../_components/table/item-count";
import ChangeStatus from "../../_components/button/change-status";
import { InstitutionTableHeader } from "../../_components/table/table-header";
import { InstitutionTableItem } from "../../_components/table/table-item";
import MoreView from "../../_components/button/more-view";
import { DELIVERY_TYPE } from "@/constants/delivery-type";
import PageToggle from "../../_components/button/page-toggle";

const Page = () => {
  const [checkedItem, setCheckedItem] = useState<number[]>([]);
  const mock = Array.from({ length: 30 }, (_, i) => i);
  const { institutions } = useSuperAdminStore();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target; // name: number = archiveId, checked: boolean
    const institutionId = parseInt(name);
    if (checked) setCheckedItem((prev) => [...prev, institutionId]);
    else
      setCheckedItem((prev) =>
        prev.filter((selectedId) => selectedId !== institutionId),
      );
  };

  return (
    <div className="bg-grey-0 w-full">
      <PageToggle curPage={DELIVERY_TYPE.INSTITUTION} />
      <div className="flex justify-between">
        <ItemCount count={mock.length} />

        <div className="flex items-center gap-4">
          <ChangeStatus selectedItemCount={checkedItem.length} />
        </div>
      </div>
      <InstitutionTableHeader />
      {mock.map((item, index) => (
        <InstitutionTableItem
          key={item}
          index={index + 1}
          {...institutions[index % institutions.length]}
          handleCheckboxChange={handleCheckboxChange}
        />
      ))}
      <MoreView viewLevel={1} count={mock.length} />
    </div>
  );
};

export default Page;
