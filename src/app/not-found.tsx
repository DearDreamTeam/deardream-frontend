"use client";

import Lottie from "@/components/anim/Lottie";
import PhotoEditor from "@/components/photo-editor/photo-editor";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NotFound = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-auto-hide-scroll flex h-full flex-col items-center gap-4">
      <div className="w-fit">
        <Lottie />
      </div>
      <p>존재하지 않는 페이지입니다.</p>
      <button className="button" onClick={() => router.replace("/home")}>
        홈으로 돌아가기
      </button>
      <button className="button" onClick={() => router.replace("/design")}>
        디자인 시스템 보기
      </button>
      <button className="button" onClick={() => setIsOpen(true)}>
        Profile Img Editor Test
      </button>
      {isOpen && (
        <PhotoEditor
          imageUrl="https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2020%2F04%2Fanimal-crossing-new-horizons-fishing-tournament-schedule-001-1.jpg?q=90&w=1400&cbr=1&fit=max"
          aspectRatio={1}
          onSave={() => {}}
          onClose={() => setIsOpen(false)}
          isProfile={true}
        />
      )}
    </div>
  );
};

export default NotFound;
