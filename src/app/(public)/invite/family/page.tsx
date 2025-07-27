import Loading from "@/components/loading-fallback/loading";
import FamilyInviteClient from "./client";
import { Suspense } from "react";

const FamilyInvitePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <FamilyInviteClient />
    </Suspense>
  );
};

export default FamilyInvitePage;
