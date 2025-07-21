import Loading from "@/components/loading-fallback/loading";
import RelationClient from "./client";
import { Suspense } from "react";

const RelationPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <RelationClient />
    </Suspense>
  );
};

export default RelationPage;
