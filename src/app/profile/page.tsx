export const dynamic = "force-dynamic";

import { Suspense } from "react";
import ProfileClient from "@/app/profile/client";

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ProfileClient />
    </Suspense>
  );
}
