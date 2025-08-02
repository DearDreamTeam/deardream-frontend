"use client";

import { useSuperAdminStore } from "@/stores/admin/useSuperAdminStroe";
import { useEffect, useState } from "react";
import PageToggle from "../../_components/button/page-toggle";
import ItemCount from "../../_components/table/item-count";
import ChangeStatus from "../../_components/button/change-status";
import { TableHeader } from "../../_components/table/table-header";
import { IndividualTableItem } from "../../_components/table/table-item";
import MoreView from "../../_components/button/more-view";
import { DELIVERY_TYPE } from "@/constants/delivery-type";
import { INDIVIDUALS_TABLE_ITEMS } from "../../_components/table/table-items";
import MonthPicker from "../../_components/month-picker";
import EmptyItem from "../../_components/table/empty-item";
import { getHomeArchives } from "@/api/admin";

const Page = () => {
  const [checkedItem, setCheckedItem] = useState<number[]>([]);
  const { individuals, pivotDate } = useSuperAdminStore();

  useEffect(() => {
    const fetchData = async () => {
      await getHomeArchives(pivotDate.getFullYear(), pivotDate.getMonth());
    };
    fetchData();
  }, [pivotDate]);

  const handleCheckboxChange = (archiveId: number, checked: boolean) => {
    if (checked) setCheckedItem((prev) => [...prev, archiveId]);
    else
      setCheckedItem((prev) =>
        prev.filter((selectedId) => selectedId !== archiveId),
      );
  };
  return (
    <div className="bg-grey-0 w-full">
      <PageToggle curPage={DELIVERY_TYPE.HOME} />
      <MonthPicker />
      <div className="flex justify-between">
        <ItemCount count={individuals.length} />

        <div className="flex items-center gap-4">
          <ChangeStatus selectedItemCount={checkedItem.length} />
        </div>
      </div>
      <TableHeader items={INDIVIDUALS_TABLE_ITEMS} keyPrefix={"inv-th"} />
      {individuals.length === 0 ? (
        <EmptyItem />
      ) : (
        individuals.map((item, index) => (
          <IndividualTableItem
            key={index}
            index={index + 1}
            {...item}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))
      )}
      <MoreView viewLevel={1} count={individuals.length} />
    </div>
  );
};

export default Page;
