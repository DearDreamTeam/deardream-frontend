import { Families } from "@/types/admin-organization-dto";
import React from "react";
import { TableHeader } from "../table/table-header";
import { INSTITUTIONS_DETAIL_TABLE_ITEMS } from "../table/table-items";
import { InstitutionDetailTableItem } from "../table/table-item";

const InstitutionDetail = ({ families }: { families: Families[] }) => {
  return (
    <div>
      <TableHeader
        items={INSTITUTIONS_DETAIL_TABLE_ITEMS}
        keyPrefix={"inst-detail"}
      />
      {families.map((item, index) => (
        <InstitutionDetailTableItem key={index} index={index + 1} {...item} />
      ))}
    </div>
  );
};

export default InstitutionDetail;
