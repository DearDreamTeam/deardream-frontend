"use client";
import Image from "next/image";
import Favorite from "@/public/icons/letters/favorite.svg";
import FavoriteFull from "@/public/icons/letters/favorite-full.svg";
import { useState } from "react";
import Link from "next/link";

const PostItem = ({ src }: { src: number }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative flex flex-col items-center gap-1 select-none">
      <Link href={`/letters/1`}>
        <Image
          src={`/mock/cover-${src + 1}.png`}
          alt="cover"
          width={104}
          height={148}
          className="shadow-default rounded-sm"
        />
      </Link>
      <Link href={`/letters/1`} className="text-label-2 text-grey-700">
        2025년 4월 호
      </Link>
      <button
        className="text-grey-0 absolute top-2 right-2"
        onClick={() => setLiked((prev) => !prev)}
      >
        {liked ? <FavoriteFull /> : <Favorite />}
      </button>
    </div>
  );
};

const PostList = () => {
  return (
    <div className="flex flex-wrap justify-between gap-x-3 gap-y-[2.12rem] py-7">
      {Array.from({ length: 10 }).map((_, index) => (
        <PostItem key={index} src={index} />
      ))}
    </div>
  );
};

export default PostList;
