import ArrowDown from "@/public/icons/common/arrow-down.svg";

const VIEW_ITEM_UNIT = 8;

const MoreView = ({
  viewLevel,
  count,
  onClick,
}: {
  viewLevel: number;
  count: number;
  onClick?: () => void;
}) => {
  if (count === 0 || viewLevel === Math.ceil(count / VIEW_ITEM_UNIT))
    return null;
  return (
    <button
      type="button"
      className="text-title-2 border-grey-200 flex w-full items-center justify-center border p-4"
      onClick={onClick}
    >
      <span className="flex items-center px-1">
        <ArrowDown />
        <span>더 보기</span>
      </span>
      <span className="text-grey-500">
        ({viewLevel}/{Math.ceil(count / VIEW_ITEM_UNIT)})
      </span>
    </button>
  );
};

export default MoreView;
