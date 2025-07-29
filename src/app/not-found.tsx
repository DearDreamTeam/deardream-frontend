"use client";

import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="overflow-auto-hide-scroll flex h-full flex-col items-center gap-4">
      <div>서비스 준비 중입니다.</div>
      <button className="button" onClick={() => router.back()}>
        되돌아 가기
      </button>
    </div>
  );
};

export default NotFound;
