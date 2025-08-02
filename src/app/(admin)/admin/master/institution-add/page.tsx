"use client";
import { ADD_INSTITUTION } from "@/constants/delivery-type";
import PageToggle from "../../_components/button/page-toggle";
import { useState } from "react";
import ItemCount from "../../_components/table/item-count";
import { TableHeader } from "../../_components/table/table-header";
import MoreAdd from "../../_components/button/more-add";
import { AddInstitutionProps } from "@/types/admin-dto";
import { ADD_INSTITUTIONS_TABLE_ITEMS } from "../../_components/table/table-items";
import { AddInstitutionTableItem } from "../../_components/table/add-inst-table-item";
import { addInstitutions } from "@/api/admin";
import { useRouter } from "next/navigation";

const DEFAULT = {
  name: "",
  postalCode: "",
  address: "",
  addressDetail: "",
  phone: "",
  serviceDate: "",
  members: NaN,
};

const Page = () => {
  const [loading, setLoading] = useState(false);
  // const [errorList, setErrorList] = useState([]);
  const router = useRouter();

  const [institutionList, setInstitutionList] = useState<AddInstitutionProps[]>(
    [DEFAULT],
  );

  const handleMoreAdd = () => setInstitutionList((prev) => [...prev, DEFAULT]);
  const handleDeleteAdd = (index: number) => {
    setInstitutionList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // setErrorList([]);

    const results = await Promise.allSettled(
      institutionList.map(
        ({
          name,
          postalCode,
          address,
          addressDetail,
          phone,
          serviceDate,
          members,
        }) =>
          addInstitutions(
            name,
            address + " " + addressDetail,
            phone,
            postalCode,
            serviceDate,
            members,
          ),
      ),
    );

    const failures = results.filter((item) => item.status === "rejected");

    if (failures.length === 0) {
      setInstitutionList([DEFAULT]);
      router.push(process.env.NEXT_PUBLIC_MASTER_ADMIN_INSTITUTION_PATH!);
    }
    setLoading(false);
  };
  return (
    <div className="bg-grey-0 w-full">
      <PageToggle curPage={ADD_INSTITUTION} />
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <ItemCount count={institutionList.length} />

          <div>
            <button type="submit" className="button" disabled={loading}>
              {institutionList.length}개 기관 {loading ? "처리 중..." : "추가"}
            </button>
          </div>
        </div>
        <TableHeader
          items={ADD_INSTITUTIONS_TABLE_ITEMS}
          keyPrefix={"add-inst-th"}
          className="break-keep"
        />
        {institutionList.map((value, index) => (
          <AddInstitutionTableItem
            key={"i-a-" + index}
            index={index}
            {...value}
            setInstitutionList={setInstitutionList}
            handleDeleteAdd={handleDeleteAdd}
          />
        ))}
        <MoreAdd onClick={handleMoreAdd} />
      </form>
    </div>
  );
};

export default Page;
