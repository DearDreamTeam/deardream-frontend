import { Families } from "@/types/admin-organization-dto";
import React from "react";
import { TableHeader } from "../table/table-header";
import { INSTITUTIONS_DETAIL_TABLE_ITEMS } from "../table/table-items";
import { InstitutionDetailTableItem } from "../table/table-item";
import ItemCount from "../table/item-count";

const InstitutionDetail = ({ families }: { families: Families[] }) => {
  return (
    <div>
      <ItemCount count={families.length} />
      <TableHeader
        TABLE_COLUMNS={INSTITUTIONS_DETAIL_TABLE_ITEMS}
        keyPrefix={"inst-detail"}
      />
      {families.map((item, index) => (
        <InstitutionDetailTableItem key={index} index={index + 1} {...item} />
      ))}
    </div>
  );
};

export default InstitutionDetail;
