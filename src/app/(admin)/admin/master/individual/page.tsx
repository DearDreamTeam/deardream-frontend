"use client";

import { useSuperAdminStore } from "@/stores/admin/useSuperAdminStroe";
import { useEffect, useState } from "react";
import PageToggle from "../../_components/button/page-toggle";
import ItemCount from "../../_components/table/item-count";
import ChangeStatus from "../../_components/button/change-status";
import { TableHeader } from "../../_components/table/table-header";
import { TableItem } from "../../_components/table/table-item";
import MoreView from "../../_components/button/more-view";
import { DELIVERY_TYPE } from "@/constants/delivery-type";
import { INDIVIDUALS_TABLE_ITEMS } from "../../_components/table/table-items";
import MonthPicker from "../../_components/month-picker";
import EmptyItem from "../../_components/table/empty-item";
import { getHomeArchives } from "@/api/admin";

const Page = () => {
  const [checkedItem, setCheckedItem] = useState<number[]>([]);
  const { individuals, pivotDate } = useSuperAdminStore(); //개별

  const [viewLevel, setViewLevel] = useState(1);
  const viewIndividuals = individuals.slice(0, viewLevel * 8);

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date(pivotDate);
      await getHomeArchives(date.getFullYear(), date.getMonth()); //함수만 다름
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
        viewIndividuals.map((item, index) => (
          <TableItem
            key={index}
            index={index + 1}
            id={item.archiveId}
            item={item}
            TABLE_COLUMNS={INDIVIDUALS_TABLE_ITEMS}
            action={handleCheckboxChange}
          />
        ))
      )}
      <MoreView
        viewLevel={viewLevel}
        count={viewIndividuals.length}
        onClick={() => setViewLevel((prev) => prev + 1)}
      />
    </div>
  );
};

export default Page;
