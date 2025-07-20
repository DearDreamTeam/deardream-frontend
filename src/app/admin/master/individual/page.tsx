"use client";

import { useSuperAdminStore } from "@/stores/admin/useSuperAdminStroe";
import { useState } from "react";
import PageToggle from "../../_components/button/page-toggle";
import ItemCount from "../../_components/table/item-count";
import ChangeStatus from "../../_components/button/change-status";
import { IndividualTableHeader } from "../../_components/table/table-header";
import { IndividualTableItem } from "../../_components/table/table-item";
import MoreView from "../../_components/button/more-view";
import { DELIVERY_TYPE } from "@/constants/delivery-type";

const Page = () => {
  const [checkedItem, setCheckedItem] = useState<number[]>([]);
  const mock = Array.from({ length: 30 }, (_, i) => i);
  const { individuals } = useSuperAdminStore();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target; // name: number = archiveId, checked: boolean
    const archiveId = parseInt(name);
    if (checked) setCheckedItem((prev) => [...prev, archiveId]);
    else
      setCheckedItem((prev) =>
        prev.filter((selectedId) => selectedId !== archiveId),
      );
  };
  return (
    <div className="bg-grey-0 w-full">
      <PageToggle curPage={DELIVERY_TYPE.HOME} />
      <div className="flex justify-between">
        <ItemCount count={mock.length} />

        <div className="flex items-center gap-4">
          <ChangeStatus selectedItemCount={checkedItem.length} />
        </div>
      </div>
      <IndividualTableHeader />
      {mock.map((item, index) => (
        <IndividualTableItem
          key={item}
          index={index + 1}
          {...individuals[index % individuals.length]}
          handleCheckboxChange={handleCheckboxChange}
        />
      ))}
      <MoreView viewLevel={1} count={mock.length} />
    </div>
  );
};

export default Page;
