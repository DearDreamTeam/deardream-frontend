"use client";

import { useUserStore } from "@/stores/useUserInfoStore";
import AlertDialog from "@/components/modal/dialog/alert-dialog";
import { useEffect, useState, useRef } from "react";
import { PATH } from "@/constants/path";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { userProfile } = useUserStore();

  const [showForbidden, setShowForbidden] = useState(false);
  const hasChecked = useRef(false);

  useEffect(() => {
    // 한 번만 체크하도록 ref 사용
    if (!hasChecked.current && userProfile.id !== -1) {
      // 프로필이 로드된 후에만 체크
      if (userProfile.familyRegistered || userProfile.role === "USER") {
        setShowForbidden(true);
      }
      hasChecked.current = true;
    }
  }, [userProfile.familyRegistered, userProfile.role, userProfile.id]);

  const handleForbidden = () => {
    router.push(PATH.HOME);
  };

  return (
    <>
      {children}

      {showForbidden && (
        <AlertDialog
          title="플랜 이미 구독 중"
          content="플랜 변경을 이용해주세요"
          setIsOpen={setShowForbidden}
          onAction={handleForbidden}
        />
      )}
    </>
  );
}
