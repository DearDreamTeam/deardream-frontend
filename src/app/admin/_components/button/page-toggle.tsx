import { ADD_INSTITUTION, DELIVERY_TYPE } from "@/constants/delivery-type";
import Link from "next/link";

const PageToggle = ({ curPage }: { curPage: number }) => {
  return (
    <div className="text-headline-3 flex gap-4">
      <div className="bg-grey-100 text-grey-500 flex w-fit gap-2 rounded-full">
        <Link
          href={process.env.NEXT_PUBLIC_MASTER_ADMIN_INDIVIDUAL_PATH!}
          className={`px-4 py-2 ${curPage === DELIVERY_TYPE.HOME && "text-grey-0 rounded-full bg-green-300"}`}
        >
          개인 플랜
        </Link>
        <Link
          href={process.env.NEXT_PUBLIC_MASTER_ADMIN_INSTITUTION_PATH!}
          className={`px-4 py-2 ${curPage === DELIVERY_TYPE.INSTITUTION && "text-grey-0 rounded-full bg-green-300"}`}
        >
          기관 플랜
        </Link>
      </div>

      <Link
        href={process.env.NEXT_PUBLIC_MASTER_ADMIN_ADD_INSTITUTION_PATH!}
        className={`rounded-full px-4 py-2 ${curPage === ADD_INSTITUTION ? "bg-grey-0 border-2 border-green-300 text-green-300" : "bg-grey-100 text-grey-500"}`}
      >
        기관 추가
      </Link>
    </div>
  );
};

export default PageToggle;
