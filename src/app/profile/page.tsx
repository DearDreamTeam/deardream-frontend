export const dynamic = "force-dynamic";

import { Suspense } from "react";
import ProfileClient from "@/app/profile/client";
import Loading from "@/components/loading-fallback/loading";

export default function ProfilePage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProfileClient />
    </Suspense>
  );
}
