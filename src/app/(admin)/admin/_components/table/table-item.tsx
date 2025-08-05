import { IndividualsDto, InstitutionsDto } from "@/types/admin-dto";
import { DeliveryStatus } from "../deliveryStatus/delivery-status";
import { DownloadPdf } from "../button/download-pdf";
import {
  INSTITUTION_FAMILY_TABLE_ITEMS,
  INSTITUTIONS_DETAIL_TABLE_ITEMS,
  TableItemsType,
} from "./table-items";
// import Cancel from "@/public/icons/common/cancel.svg";
import { Families, OrganizationFamilies } from "@/types/admin-organization-dto";
import Checkbox from "../button/checkbox";

interface TableItemProps {
  index: number;
  id: number;
  item:
    | IndividualsDto
    | InstitutionsDto
    | {
        id: number;
        name: string;
        code: number | string;
        deliveryStatus: string;
        selectedStatus: keyof typeof DELIVERY_STATUS | null;
      };
  TABLE_COLUMNS: TableItemsType;
  action: (id: number, checked: boolean) => void;
  gap?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const TableItem = ({
  index,
  id,
  item,
  TABLE_COLUMNS,
  action,
  gap = "gap-4",
  isSelected,
  onClick,
}: TableItemProps) => {
  return (
    <div
      className={`admin-table-item ${gap} data-[status=selected]:bg-green-100`}
      data-status={isSelected && "selected"}
      onClick={onClick}
    >
      {TABLE_COLUMNS.map(({ value, flex }: { value: string; flex: string }) => {
        const key = value + index;
        if (value === "deliveryStatus")
          return (
            <span key={key} className={flex}>
              {DeliveryStatus(item.deliveryStatus)}
            </span>
          );
        if ("selectedStatus" in item && value === "selectedStatus")
          return (
            <span key={key} className={flex}>
              {DeliveryStatus(item.selectedStatus ?? "")}
            </span>
          );
        if ("pdfUrl" in item && value === "pdfUrl")
          return (
            <span key={key} className={flex}>
              <DownloadPdf pdfUrl={item.pdfUrl ?? ""} isDownloaded={false} />
            </span>
          );
        if (value === "checkbox")
          return (
            <span key={key} className={flex}>
              <Checkbox
                idValue={id}
                callback={action}
                isChecked={"selectedStatus" in item}
              />
            </span>
          );
        if (value === "progressUi")
          return <span key={key} className={flex}>{`->`}</span>;
        return (
          <span key={key} className={flex}>
            {item[value as keyof typeof item] ?? index}
          </span>
        );
      })}
    </div>
  );
};

export const InstitutionDetailTableItem = (
  props: {
    index: number;
  } & Families,
) => {
  return (
    <div className="admin-table-item gap-4">
      {INSTITUTIONS_DETAIL_TABLE_ITEMS.map(({ value, flex }) => {
        const key = value + props.index;
        type Key = keyof Families;
        if (value === "deliveryStatus")
          return (
            <span key={key} className={flex}>
              {DeliveryStatus(props.deliveryStatus)}
            </span>
          );
        if (value === "pdfUrl")
          return (
            <span key={key} className={flex}>
              <DownloadPdf pdfUrl={props.pdfUrl ?? ""} isDownloaded={false} />
            </span>
          );
        return (
          <span key={key} className={flex}>
            {props[value as Key]}
          </span>
        );
      })}
    </div>
  );
};
import More from "@/public/icons/post-card/more.svg";
import Link from "next/link";
import { DELIVERY_STATUS } from "@/constants/delivery-status";
export const InstitutionFamilyTableItem = (
  props: {
    index: number;
    handleDeleteMember: (familyId: number) => void;
  } & OrganizationFamilies,
) => {
  return (
    <Link
      href={`/admin/organization/${props.familyId}`}
      className="admin-table-item gap-2"
    >
      {INSTITUTION_FAMILY_TABLE_ITEMS.map(({ value, flex }) => {
        const key = value + props.index;
        type Key = keyof OrganizationFamilies;
        if (value === "deliveryStatus")
          return (
            <span key={key} className={flex}>
              {DeliveryStatus(props.deliveryStatus)}
            </span>
          );
        if (value === "delete")
          return (
            <span key={key} className={flex}>
              <button
                type="button"
                className="text-grey-700 w-fit rotate-90 transform rounded-full"
                onClick={() => props.handleDeleteMember(props.familyId)}
              >
                <More />
              </button>
            </span>
          );
        return (
          <span key={key} className={flex}>
            {props[value as Key]}
          </span>
        );
      })}
    </Link>
  );
};
