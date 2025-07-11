import CheckItem from "@/components/profile/plan/plan-check";
interface PlanTypeInfo {
  isActive?: boolean;
  planType?: "PERSONAL" | "INSTITUTION" | "NONE"; // "PERSONAL" | "INSTITUTION" | "NONE"
}

const PesonalPlanUse = ({ isActive, planType }: PlanTypeInfo) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <CheckItem isActive={isActive} planType={planType} option="pdf">
          PDF 열람 및 다운로드 지원
        </CheckItem>
        <CheckItem isActive={isActive} planType={planType}>
          원하는 주소로 배송
        </CheckItem>
        <CheckItem isActive={isActive} planType={planType}>
          n인 이용 가능
        </CheckItem>
      </div>
    </>
  );
};
export default PesonalPlanUse;
