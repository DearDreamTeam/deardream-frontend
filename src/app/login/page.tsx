import { Suspense } from "react";
import LoginPageClient from "./client";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="text-grey-800 flex h-full flex-col items-center justify-center gap-6 bg-green-100 text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-green-600" />
          <div className="text-xl font-semibold">정보를 불러오는 중입니다</div>
          <p className="text-grey-500 animate-pulse text-base">
            잠시만 기다려 주세요...
          </p>
        </div>
      }
    >
      <LoginPageClient />
    </Suspense>
  );
}
