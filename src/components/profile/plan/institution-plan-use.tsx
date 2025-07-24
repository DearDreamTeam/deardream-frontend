import CheckItem from "@/components/profile/plan/plan-check";
interface PlanTypeInfo {
  isActive?: boolean;
  planType?: "HOME" | "INSTITUTION" | "NONE"; // "HOME" | "INSTITUTION" | "NONE"
  isNotPdf?: boolean;
}

const InstitutionPlanUse = ({ isActive, planType, isNotPdf }: PlanTypeInfo) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <CheckItem isActive={isActive} planType={planType}>
          기관으로 배송
        </CheckItem>
        <CheckItem isActive={isActive} planType={planType}>
          개인 비용 부담 없음
        </CheckItem>
        {!isNotPdf && (
          <CheckItem isActive={isActive} planType={planType}>
            PDF 열람 및 다운로드 지원
          </CheckItem>
        )}
        <CheckItem isActive={isActive} planType={planType}>
          소식 20개 작성 가능{" "}
        </CheckItem>{" "}
        <CheckItem isActive={isActive} planType={planType}>
          30인 이용 가능
        </CheckItem>
      </div>
    </>
  );
};
export default InstitutionPlanUse;
