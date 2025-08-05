"use client";

import { createPortal } from "react-dom";
import Cancel from "@/public/icons/common/cancel.svg";
import { DELIVERY_STATUS } from "@/constants/delivery-status";
import { useState } from "react";
import { DeliveryStatus } from "../deliveryStatus/delivery-status";
import { TableHeader } from "../table/table-header";
import { STATUS_CHANGE_ITEMS } from "../table/table-items";
import ItemCount from "../table/item-count";
import { IndividualsDto, InstitutionsDto } from "@/types/admin-dto";
import { TableItem } from "../table/table-item";
import { CheckboxProps } from "../button/checkbox-props";
import {
  setArchiveDeliveryStatus,
  setInstitutionDeliveryStatus,
} from "@/api/admin";
import { useSuperAdminStore } from "@/stores/admin/useSuperAdminStroe";

const Modal = ({
  idList,
  items,
  onClose,
  handleCheckboxChange,
  resetCheckItem,
}: {
  idList: number[];
  items: InstitutionsDto[] | IndividualsDto[];
  onClose: () => void;
  handleCheckboxChange: CheckboxProps;
  resetCheckItem: () => void;
}) => {
  const [selectedStatus, setStatus] = useState<
    keyof typeof DELIVERY_STATUS | null
  >(null);
  const [processing, setProcessing] = useState(false);
  const { pivotDate, setPivotDate } = useSuperAdminStore();

  const targetList = items
    .map((item) => {
      if ("institutionId" in item) {
        if (idList.includes(item.institutionId))
          return {
            id: item.institutionId,
            name: item.name,
            code: item.code,
            deliveryStatus: item.deliveryStatus,
          };
      } else {
        if (idList.includes(item.archiveId))
          return {
            id: item.archiveId,
            name: item.receiverName,
            code: item.archiveId,
            deliveryStatus: item.deliveryStatus,
          };
      }
    })
    .filter((item) => item !== undefined);

  const handleChangeStatus = async () => {
    setProcessing(true);
    if (selectedStatus === null) return;
    const date = new Date(pivotDate);
    const results = await Promise.allSettled(
      targetList.map(({ code }) =>
        typeof code === "string"
          ? setInstitutionDeliveryStatus(
              code,
              selectedStatus,
              date.getFullYear(),
              date.getMonth(),
            )
          : setArchiveDeliveryStatus(code, selectedStatus),
      ),
    );

    const failures = results.filter((item) => item.status === "rejected");

    if (failures.length === 0) {
      resetCheckItem();
      onClose();
      setPivotDate(date);
    }
    setProcessing(false);
  };

  return createPortal(
    <div className="modal-bg top-0 left-0 flex h-full w-full items-center justify-center">
      <div className="modal-main w-4xl rounded p-6">
        <section className="flex justify-between">
          <h1 className="text-headline-1">상태 변경 하기</h1>
          <button type="button" onClick={onClose}>
            <Cancel />
          </button>
        </section>

        <section className="flex gap-20 p-4">
          {Object.entries(DELIVERY_STATUS).map(([key, { value }]) => (
            <div
              className="flex gap-2"
              key={key}
              onClick={() => setStatus(value as keyof typeof DELIVERY_STATUS)}
            >
              <input
                type="radio"
                name={value}
                value={value}
                checked={value === selectedStatus}
                onChange={() =>
                  setStatus(value as keyof typeof DELIVERY_STATUS)
                }
              />
              {DeliveryStatus(value)}
            </div>
          ))}
        </section>

        <div className="flex items-center justify-between pr-3">
          <ItemCount count={idList.length} />
          <button
            type="button"
            className="button"
            disabled={selectedStatus === null || processing}
            onClick={handleChangeStatus}
          >
            승인
          </button>
        </div>
        <TableHeader
          TABLE_COLUMNS={STATUS_CHANGE_ITEMS}
          keyPrefix={"change-"}
        />
        <section className="overflow-auto-hide-scroll max-h-[400px]">
          {targetList.map((target, index) => (
            <TableItem
              key={"target" + index}
              TABLE_COLUMNS={STATUS_CHANGE_ITEMS}
              index={index + 1}
              id={target.id}
              item={{ ...target, selectedStatus: selectedStatus }}
              isChecked={idList.includes(target.id)}
              action={handleCheckboxChange}
            />
          ))}
        </section>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
