import { Suspense } from "react";
import LoginPageClient from "./client";
import Loading from "@/components/loading-fallback/loading";

export default function Page() {
  return (
    //useParams를 써야하기 때문에 suspense로 감싸줘야함
    <Suspense fallback={<Loading />}>
      {/* 페이지 내부에서 렌더링 되는 컴포넌트 */}
      <LoginPageClient />
    </Suspense>
  );
}
