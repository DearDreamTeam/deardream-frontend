import { Suspense } from "react";
import CompleteClient from "./client";
import Loading from "@/components/loading-fallback/loading";

const CompletePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CompleteClient />
    </Suspense>
  );
};

export default CompletePage;
