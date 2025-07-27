"use client";

import { useUserStore } from "@/stores/useUserInfoStore";
import AlertDialog from "@/components/modal/dialog/alert-dialog";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (userProfile.familyRegistered || userProfile.role == "USER") {
      setShowForbidden(true);
    }
  }, [userProfile.familyRegistered, userProfile.role]);

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
