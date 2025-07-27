import Link from "next/link";
import Image from "next/image";
import Favorite from "@/public/icons/letters/favorite.svg";
import FavoriteFull from "@/public/icons/letters/favorite-full.svg";
import { Newsletter } from "@/stores/useLettersStore";
import { formatDateForNewsletter } from "@/utils/format-date";
import { PendingPost, ShippingPost } from "./post-status";
import { DELIVERY_STATUS } from "@/constants/delivery-status";

const PostItem = ({
  pdfId,
  coverImgUrl,
  timestamp,
  liked,
  status,
  setLikedToggle,
}: Newsletter & { setLikedToggle: (pdfId: number) => void }) => {
  return (
    <div className="relative flex flex-col items-center gap-1 select-none">
      <Link
        href={`/letters/${pdfId}`}
        className={
          status === DELIVERY_STATUS.PENDING.value
            ? "pointer-events-none"
            : undefined
        }
      >
        <Image
          src={coverImgUrl}
          alt="cover"
          width={104}
          height={148}
          className="shadow-default rounded-sm"
        />
        {status === DELIVERY_STATUS.PENDING.value ? (
          <PendingPost />
        ) : status === DELIVERY_STATUS.SHIPPING.value ? (
          <ShippingPost />
        ) : null}
      </Link>
      <Link
        href={`/letters/${pdfId}`}
        className={`text-label-2 text-grey-700 ${status === DELIVERY_STATUS.PENDING.value ? "pointer-events-none" : undefined}`}
      >
        {formatDateForNewsletter(timestamp)}
      </Link>
      <button
        className="text-grey-0 absolute top-2 right-2"
        onClick={() => setLikedToggle(pdfId)}
      >
        {liked ? <FavoriteFull /> : <Favorite />}
      </button>
    </div>
  );
};
export default PostItem;
