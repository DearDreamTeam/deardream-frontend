export const dynamic = "force-dynamic";

import { Suspense } from "react";
import ProfileClient from "./ProfileClient";

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ProfileClient />
    </Suspense>
  );
}
