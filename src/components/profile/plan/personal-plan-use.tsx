import CheckItem from "@/components/profile/plan/plan-check";
interface PlanTypeInfo {
  isActive?: boolean;
  planType?: "HOME" | "INSTITUTION" | "NONE"; // "HOME" | "INSTITUTION" | "NONE"
}

const PesonalPlanUse = ({ isActive, planType }: PlanTypeInfo) => {
  return (
    <>
      <div className="flex flex-col gap-2 p-2">
        <CheckItem isActive={isActive} planType={planType}>
          원하는 주소로 배송{" "}
        </CheckItem>
        <CheckItem isActive={isActive} planType={planType}>
          PDF 열람 및 다운로드 지원
        </CheckItem>
        <CheckItem isActive={isActive} planType={planType}>
          소식 20개 작성 가능
        </CheckItem>
        <CheckItem isActive={isActive} planType={planType}>
          30인 이용 가능
        </CheckItem>
      </div>
    </>
  );
};
export default PesonalPlanUse;
