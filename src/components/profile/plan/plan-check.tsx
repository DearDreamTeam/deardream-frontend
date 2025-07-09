import GreenCheck from "@/public/icons/common/green-check.svg";
import GreyCheck from "@/public/icons/common/grey-check.svg";

type PlanTypeInfo = "PERSONAL" | "INSTITUTION" | "NONE";

const useCheckItem = ({
  children,
  isActive,
  planType,
  option,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  planType?: PlanTypeInfo;
  option?: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      {!isActive ||
      (isActive && planType !== "INSTITUTION" && option !== "pdf") ? (
        <GreyCheck />
      ) : (
        <GreenCheck />
      )}
      <span
        className={`text-label-2 ${!isActive || (isActive && planType !== "INSTITUTION" && option !== "pdf") ? `text-grey-700` : `text-green-300`}`}
      >
        {children}
      </span>
    </div>
  );
};

export default useCheckItem;
