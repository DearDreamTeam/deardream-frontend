import { IndividualsDto, InstitutionsDto } from "@/types/admin-dto";
import { DeliveryStatus } from "../deliveryStatus/delivery-status";
import { DownloadPdf } from "../button/download-pdf";
import {
  INDIVIDUALS_TABLE_ITEMS,
  INSTITUTION_FAMILY_TABLE_ITEMS,
  INSTITUTIONS_DETAIL_TABLE_ITEMS,
  INSTITUTIONS_TABLE_ITEMS,
} from "./table-items";
// import Cancel from "@/public/icons/common/cancel.svg";
import { Families, OrganizationFamilies } from "@/types/admin-organization-dto";
import Checkbox from "../button/checkbox";
import { CheckboxProps } from "../button/checkbox-props";

interface TableItemProps {
  index: number;
  id: number;
  item: IndividualsDto | InstitutionsDto;
  action: (id: number) => void;
}

export const TableItem = ({ index, id, item, action }: TableItemProps) => {
  return (
    <div className="admin-table-item gap-4">
      {INDIVIDUALS_TABLE_ITEMS.map(({ value, flex }) => {
        const key = value + index;
        if (value === "deliveryStatus")
          return (
            <span key={key} className={flex}>
              {DeliveryStatus(item.deliveryStatus)}
            </span>
          );
        if (value === "pdfUrl")
          return (
            <span key={key} className={flex}>
              <DownloadPdf pdfUrl={item.pdfUrl} isDownloaded={false} />
            </span>
          );
        if (value === "checkbox")
          return (
            <span key={key} className={flex}>
              <Checkbox idValue={id} callback={action} />
            </span>
          );
        return (
          <span key={key} className={flex}>
            {item[value as keyof typeof item]}
          </span>
        );
      })}
    </div>
  );
};

export const IndividualTableItem = (
  props: {
    index: number;
    handleCheckboxChange: CheckboxProps;
  } & IndividualsDto,
) => {
  return (
    <div className="admin-table-item gap-4">
      {INDIVIDUALS_TABLE_ITEMS.map(({ value, flex }) => {
        const key = value + props.index;
        type Key = keyof IndividualsDto;
        if (value === "deliveryStatus")
          return (
            <span key={key} className={flex}>
              {DeliveryStatus(props.deliveryStatus)}
            </span>
          );
        if (value === "pdfUrl")
          return (
            <span key={key} className={flex}>
              <DownloadPdf pdfUrl={props.pdfUrl} isDownloaded={false} />
            </span>
          );
        if (value === "checkbox")
          return (
            <span key={key} className={flex}>
              <Checkbox
                idValue={props.archiveId}
                callback={props.handleCheckboxChange}
              />
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

export const InstitutionTableItem = (
  props: {
    index: number;
    isSelected: boolean;
    handleCheckboxChange: CheckboxProps;
    onClick: () => void;
  } & InstitutionsDto,
) => {
  return (
    <div
      className="admin-table-item gap-2 data-[status=selected]:bg-green-100"
      data-status={props.isSelected && "selected"}
      onClick={props.onClick}
    >
      {INSTITUTIONS_TABLE_ITEMS.map(({ value, flex }) => {
        const key = value + props.index;
        type Key = keyof InstitutionsDto;
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
        if (value === "checkbox")
          return (
            <span key={key} className={flex}>
              <Checkbox
                idValue={props.institutionId}
                callback={props.handleCheckboxChange}
              />
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
