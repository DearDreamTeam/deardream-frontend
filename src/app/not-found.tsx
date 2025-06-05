"use client";

import Lottie from "@/components/anim/Lottie";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="w-fit">
        <Lottie />
      </div>
      <p>존재하지 않는 페이지입니다.</p>
      <button className="button m-4" onClick={() => router.replace("/home")}>
        홈으로 돌아가기
      </button>
      <button className="button" onClick={() => router.replace("/design")}>
        디자인 시스템 보기
      </button>
    </div>
  );
};

export default NotFound;
