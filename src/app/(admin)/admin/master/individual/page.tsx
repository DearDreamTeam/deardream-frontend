"use client";

import { useSuperAdminStore } from "@/stores/admin/useSuperAdminStroe";

import { DELIVERY_TYPE } from "@/constants/delivery-type";
import { getHomeArchives } from "@/api/admin";

import { INDIVIDUALS_TABLE_ITEMS } from "../../_components/table/table-items";
import TableViewer from "../../_components/viewer/table-viewer";

const Page = () => {
  const { individuals } = useSuperAdminStore(); //개별

  return (
    <TableViewer
      items={individuals}
      TABLE_COLUMNS={INDIVIDUALS_TABLE_ITEMS}
      curPageNum={DELIVERY_TYPE.HOME}
      keyPrefix={"home-th"}
      fetchItem={getHomeArchives}
    />
  );
};

export default Page;
