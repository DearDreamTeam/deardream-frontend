import { Suspense } from "react";

const CompletePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {" "}
      <div>CompletePage</div>
    </Suspense>
  );
};

export default CompletePage;
