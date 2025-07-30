import Image from "next/image";

const OrganizationInfo = () => {
  return (
    <div className="border-b-grey-500 flex flex-col items-center border-b pt-2 pb-10">
      <Image
        src={"/images/admin/mock-organization.svg"}
        alt="organization logo"
        width={65}
        height={65}
        className="py-6"
      />
      <div className="text-body-1 text-grey-0">은평어르신돌봄통합지원센터</div>
    </div>
  );
};

export default OrganizationInfo;
