import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IndividualsDto, InstitutionsDto } from "@/types/admin-dto";
import { useSuperAdminStore } from "@/stores/admin/useSuperAdminStroe";

import { TableItemsType } from "../table/table-items";
import { TableHeader } from "../table/table-header";
import { TableItem } from "../table/table-item";
import EmptyItem from "../table/empty-item";
import PageToggle from "../button/page-toggle";
import MonthPicker from "../month-picker";
import ItemCount from "../table/item-count";
import ChangeStatus from "../button/change-status";
import MoreView from "../button/more-view";
import Modal from "../modal/modal";

interface TableViewerProps {
  items: InstitutionsDto[] | IndividualsDto[];
  TABLE_COLUMNS: TableItemsType;
  curPageNum: number;
  keyPrefix: string;
  fetchItem: (year: number, month: number) => Promise<never[] | undefined>;
  gap?: string;

  selectedInstitution?: number | null;
  setSelecedInstitution?: Dispatch<SetStateAction<number | null>>;
}
const TableViewer = ({
  items,
  fetchItem,
  TABLE_COLUMNS,
  curPageNum,
  keyPrefix,
  gap = "gap-4",
  selectedInstitution,
  setSelecedInstitution,
}: TableViewerProps) => {
  const [checkedItem, setCheckedItem] = useState<number[]>([]);
  const { pivotDate } = useSuperAdminStore();

  const [viewLevel, setViewLevel] = useState(1);
  const viewItem = items.slice(0, viewLevel * 8);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date(pivotDate);
      await fetchItem(date.getFullYear(), date.getMonth()); //함수만 다름
    };
    fetchData();
  }, [pivotDate, fetchItem]);

  const handleCheckboxChange = (id: number, checked: boolean) => {
    setCheckedItem((prev) => {
      const set = new Set(prev);
      if (checked) {
        set.add(id);
      } else {
        set.delete(id);
      }
      return Array.from(set);
    });
  };

  const handleChangeStatus = () => {
    setOpen(true);
  };
  return (
    <div className="bg-grey-0 w-full">
      <PageToggle curPage={curPageNum} />
      <MonthPicker />
      <div className="flex justify-between">
        <ItemCount count={items.length} />

        <div className="flex items-center gap-4">
          <ChangeStatus
            selectedItemCount={checkedItem.length}
            onClick={handleChangeStatus}
          />
        </div>
      </div>
      <TableHeader
        TABLE_COLUMNS={TABLE_COLUMNS}
        keyPrefix={keyPrefix}
        gap={gap}
      />
      {items.length === 0 ? (
        <EmptyItem />
      ) : (
        viewItem.map((item, index) => (
          <TableItem
            key={index}
            index={index + 1}
            id={"institutionId" in item ? item.institutionId : item.archiveId}
            item={item}
            TABLE_COLUMNS={TABLE_COLUMNS}
            action={handleCheckboxChange}
            gap={gap}
            isChecked={checkedItem.includes(
              "institutionId" in item ? item.institutionId : item.archiveId,
            )}
            {...("institutionId" in item
              ? {
                  isSelected: selectedInstitution === item.institutionId,
                  onClick: () =>
                    setSelecedInstitution?.((prev) =>
                      prev === item.institutionId ? null : item.institutionId,
                    ),
                }
              : {})}
          />
        ))
      )}
      <MoreView
        viewLevel={viewLevel}
        count={items.length}
        onClick={() => setViewLevel((prev) => prev + 1)}
      />

      {open && (
        <Modal
          idList={checkedItem}
          items={items}
          onClose={() => setOpen(false)}
          handleCheckboxChange={handleCheckboxChange}
          resetCheckItem={() => setCheckedItem([])}
        />
      )}
    </div>
  );
};

export default TableViewer;
