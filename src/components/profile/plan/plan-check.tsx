import GreenCheck from "@/public/icons/common/green-check.svg";
import GreyCheck from "@/public/icons/common/grey-check.svg";

type PlanTypeInfo = "HOME" | "INSTITUTION" | "NONE";

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
      {isActive || (!isActive && planType === "HOME" && option === "pdf") ? (
        <GreenCheck />
      ) : (
        <GreyCheck />
      )}
      <span
        className={`text-label-2 ${
          isActive || (!isActive && planType === "HOME" && option === "pdf")
            ? `text-green-300`
            : `text-grey-700`
        }`}
      >
        {children}
      </span>
    </div>
  );
};

export default useCheckItem;
