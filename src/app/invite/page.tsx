import { Suspense } from "react";
import InvitePageClient from "./client";
import Loading from "@/components/loading-fallback/loading";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <InvitePageClient />
    </Suspense>
  );
}
