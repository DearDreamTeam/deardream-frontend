"use client";

import { useState } from "react";
import { useSuperAdminStore } from "@/stores/admin/useSuperAdminStroe";

import { DELIVERY_TYPE } from "@/constants/delivery-type";
import { Families } from "@/types/admin-organization-dto";
import { getInstitutionArchives } from "@/api/admin";

import { INSTITUTIONS_TABLE_ITEMS } from "../../_components/table/table-items";
import InstitutionDetail from "../../_components/viewer/institution-detail";
import TableViewer from "../../_components/viewer/table-viewer";

const Page = () => {
  const { institutions } = useSuperAdminStore();
  const [selectedInstitution, setSelecedInstitution] = useState<null | number>(
    null,
  );
  const [families] = useState<Families[]>([]);

  return (
    <>
      <TableViewer
        items={institutions}
        TABLE_COLUMNS={INSTITUTIONS_TABLE_ITEMS}
        idName={"institutionId"}
        curPageNum={DELIVERY_TYPE.INSTITUTION}
        keyPrefix={"inst-th"}
        fetchItem={getInstitutionArchives}
        gap="gap-2"
        selectedInstitution={selectedInstitution}
        setSelecedInstitution={setSelecedInstitution}
      />
      {selectedInstitution && <InstitutionDetail families={families} />}
    </>
  );
};

export default Page;
