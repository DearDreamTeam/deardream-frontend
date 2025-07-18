import { Suspense } from "react";
import InvitePageClient from "./client";

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <InvitePageClient />
    </Suspense>
  );
}
