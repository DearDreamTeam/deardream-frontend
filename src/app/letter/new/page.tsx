"use client";
import ActionHeader from "@/components/header/action-header";
import { useRouter } from "next/navigation";

const New = () => {
  const router = useRouter();
  return (
    <div>
      <ActionHeader>
        <button className="p-2" onClick={router.back}>
          취소
        </button>
        <button className="p-2">등록</button>
      </ActionHeader>
    </div>
  );
};

export default New;
