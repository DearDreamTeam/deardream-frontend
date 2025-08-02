"use client";
import { useSuperAdminStore } from "@/stores/admin/useSuperAdminStroe";
import { useEffect, useState } from "react";
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
import EmptyItem from "../../_components/table/empty-item";
import { Families } from "@/types/admin-organization-dto";
import { getInstitutionArchives } from "@/api/admin";

const Page = () => {
  const [checkedItem, setCheckedItem] = useState<number[]>([]);
  const { institutions, pivotDate } = useSuperAdminStore();
  const [selectedInstitution, setSelecedInstitution] = useState<null | number>(
    null,
  );
  const [families] = useState<Families[]>([]);
  const [viewLevel, setViewLevel] = useState(1);
  const viewInstitutions = institutions.slice(0, viewLevel * 8);

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date(pivotDate);
      await getInstitutionArchives(date.getFullYear(), date.getMonth());
    };
    fetchData();
  }, [pivotDate]);

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
      {institutions.length === 0 ? (
        <EmptyItem />
      ) : (
        viewInstitutions.map((item, index) => (
          <InstitutionTableItem
            key={index}
            index={index + 1}
            {...item}
            handleCheckboxChange={handleCheckboxChange}
            isSelected={selectedInstitution === item.institutionId}
            onClick={() =>
              setSelecedInstitution((prev) =>
                prev === item.institutionId ? null : item.institutionId,
              )
            }
          />
        ))
      )}
      <MoreView
        viewLevel={viewLevel}
        count={institutions.length}
        onClick={() => setViewLevel((prev) => prev + 1)}
      />

      {selectedInstitution && <ItemCount count={families.length} />}
      {selectedInstitution && <InstitutionDetail families={families} />}
    </div>
  );
};

export default Page;
