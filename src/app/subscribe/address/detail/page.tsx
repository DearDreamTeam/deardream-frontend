// app/page.tsx
"use client";

import AddressInput from "@/components/address/address-input";
import Header from "@/components/common/header";

const DetailAddress = () => {
  return (
    <>
      <Header>주소 및 수령 방식</Header>
      <AddressInput isInstitution={true} />
    </>
  );
};
export default DetailAddress;
