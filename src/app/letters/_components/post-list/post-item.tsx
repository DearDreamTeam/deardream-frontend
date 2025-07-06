import Link from "next/link";
import Image from "next/image";
import Favorite from "@/public/icons/letters/favorite.svg";
import FavoriteFull from "@/public/icons/letters/favorite-full.svg";
import { Newsletter } from "@/stores/useLettersStore";
import { formatDateForNewsletter } from "@/utils/format-date";

const PostItem = ({
  pdfId,
  coverImgUrl,
  timestamp,
  liked,
  setLikedNews,
}: Newsletter & { setLikedNews: (pdfId: number) => void }) => {
  return (
    <div className="relative flex flex-col items-center gap-1 select-none">
      <Link href={`/letters/${pdfId}`}>
        <Image
          src={coverImgUrl}
          alt="cover"
          width={104}
          height={148}
          className="shadow-default rounded-sm"
        />
      </Link>
      <Link href={`/letters/${pdfId}`} className="text-label-2 text-grey-700">
        {formatDateForNewsletter(timestamp)}
      </Link>
      <button
        className="text-grey-0 absolute top-2 right-2"
        onClick={() => setLikedNews(pdfId)}
      >
        {liked ? <FavoriteFull /> : <Favorite />}
      </button>
    </div>
  );
};
export default PostItem;
