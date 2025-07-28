import Link from "next/link";
import Image from "next/image";
import Favorite from "@/public/icons/letters/favorite.svg";
import FavoriteFull from "@/public/icons/letters/favorite-full.svg";
import { Newsletter } from "@/stores/useLettersStore";
import { PendingPost, ShippingPost } from "./post-status";
import { DELIVERY_STATUS } from "@/constants/delivery-status";
import { formatDateForNewsletter } from "@/utils/format-date";

const PostItem = ({
  archiveId,
  pdfUrl,
  thumbnailUrl,
  yearMonthType,
  deliveryStatus,
  liked,
  setLikedToggle,
}: Newsletter & {
  liked: boolean;
  setLikedToggle: (archiveId: number) => void;
}) => {
  const date = formatDateForNewsletter(yearMonthType);
  const href = {
    pathname: `/letters/${archiveId}`,
    query: {
      pdfUrl: pdfUrl,
      title: date,
    },
  };
  return (
    <div className="relative flex flex-col items-center gap-1 select-none">
      <Link
        href={pdfUrl}
        // className={
        //   deliveryStatus === DELIVERY_STATUS.PENDING.value
        //     ? "pointer-events-none"
        //     : undefined
        // }
      >
        <div className="relative h-[148px] w-[104px]">
          <Image
            src={thumbnailUrl}
            alt="cover"
            fill
            sizes="104px"
            className="shadow-default rounded-sm object-cover"
            priority
          />
          {deliveryStatus === DELIVERY_STATUS.PENDING.value ? (
            <PendingPost />
          ) : deliveryStatus === DELIVERY_STATUS.SHIPPING.value ? (
            <ShippingPost />
          ) : null}
        </div>
      </Link>

      <Link
        href={href}
        className={`text-label-2 text-grey-700 ${deliveryStatus === DELIVERY_STATUS.PENDING.value ? "pointer-events-none" : undefined}`}
      >
        {date}
      </Link>

      <button
        className="text-grey-0 absolute top-2 right-2"
        onClick={() => setLikedToggle(archiveId)}
      >
        {liked ? <FavoriteFull /> : <Favorite />}
      </button>
    </div>
  );
};
export default PostItem;
