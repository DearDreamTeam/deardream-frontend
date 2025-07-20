"use client";
import { ADD_INSTITUTION } from "@/constants/delivery-type";
import PageToggle from "../../_components/button/page-toggle";
import { useEffect, useState } from "react";
import ItemCount from "../../_components/table/item-count";
import { AddInstitutionTableHeader } from "../../_components/table/table-header";
import { AddInstitutionTableItem } from "../../_components/table/table-item";
import MoreAdd from "../../_components/button/more-add";
import { AddInstitutionProps } from "@/types/admin-dto";

const DEFAULT = {
  name: "",
  postalCode: "",
  address: "",
  addressDetail: "",
  phone: "",
  serviceDate: "",
  members: 0,
};

const Page = () => {
  const [institutionList, setInstitutionList] = useState<AddInstitutionProps[]>(
    [DEFAULT],
  );

  useEffect(() => {
    console.log("institutionList", institutionList);
  }, [institutionList]);

  const handleMoreAdd = () => setInstitutionList((prev) => [...prev, DEFAULT]);
  const handleDeleteAdd = (index: number) => {
    setInstitutionList((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="bg-grey-0 w-full">
      <PageToggle curPage={ADD_INSTITUTION} />
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <ItemCount count={institutionList.length} />

          <div>
            <button type="submit" className="button">
              {institutionList.length}개 기관 추가
            </button>
          </div>
        </div>
        <AddInstitutionTableHeader />
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
